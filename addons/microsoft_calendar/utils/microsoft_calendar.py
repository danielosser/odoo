# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

import requests
import json
import logging

from werkzeug import urls

from odoo.addons.microsoft_calendar.utils.microsoft_event import MicrosoftEvent
from odoo.addons.microsoft_account.models.microsoft_service import TIMEOUT, RESOURCE_NOT_FOUND_STATUSES

_logger = logging.getLogger(__name__)

def requires_auth_token(func):
    def wrapped(self, *args, **kwargs):
        if not kwargs.get('token'):
            raise AttributeError("An authentication token is required")
        return func(self, *args, **kwargs)
    return wrapped

class InvalidSyncToken(Exception):
    pass

# In Outlook, an event can be:
# - a 'singleInstance' event,
# - a 'serie master' which contains all the information about an event reccurrence such as
# - an 'occurrence' which is an event from a reccurrence (serie) that follows this reccurrence
# - an 'exception' which is an event from a reccurrence (serie) but some differences with the reccurrence template (could be
#   the name, the day of occurrence, ...)
#
#  All these kinds of events are identified by:
#  - a event ID (id) which is specific to an Outlook calendar.
#  - a global event ID (iCalUId) which is common to all Outlook calendars containing this event.
#
#  - 'singleInstance' and 'serie master' events are retrieved through the end-point `/v1.0/me/calendarView/delta` which provides
#  the last modified/deleted items since the last sync (or all of these items at the first time).
#  - 'occurrence' and 'exception' events are retrieved through the end-point `/v1.0/me/events/{serieMaster.id}/instances`,
#  using the corresponding serie master ID.

class MicrosoftCalendarService():

    def __init__(self, microsoft_service):
        self.microsoft_service = microsoft_service

    @requires_auth_token
    def _get_events_delta(self, sync_token=None, token=None, timeout=TIMEOUT):
        """
        Get a set of events that have been added, deleted or updated in a time range.
        See: https://docs.microsoft.com/en-us/graph/api/event-delta?view=graph-rest-1.0&tabs=http
        """
        url = "/v1.0/me/calendarView/delta"
        headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % token}
        params = {}

        if sync_token:
            params['$deltatoken'] = sync_token
        else:
            params['startDateTime'] = '2016-12-01T00:00:00Z'
            params['endDateTime'] = '2030-1-01T00:00:00Z'

        try:
            dummy, data, dummy = self.microsoft_service._do_request(url, params, headers, method='GET', timeout=timeout)
        except requests.HTTPError as e:
            if e.response.status_code == 410 and 'fullSyncRequired' in str(e.response.content) and sync_token:
                # retry with a full sync
                return self._get_events_delta(token=token, timeout=timeout)
            raise e

        events = data.get('value', [])
        next_page_token = data.get('@odata.nextLink')
        while next_page_token:
            dummy, data, dummy = self.microsoft_service._do_request(next_page_token, {}, headers, preuri='', method='GET', timeout=timeout)
            next_page_token = data.get('@odata.nextLink')
            events += data.get('value', [])

        token_url = data.get('@odata.deltaLink')
        next_sync_token = urls.url_parse(token_url).decode_query().get('$deltatoken', False) if token_url else None

        # event occurrences (from a recurrence) are retrieved separately to get all their info,
        # # and mainly the iCalUId attribute which is not provided by the 'get_delta' api end point
        events = list(filter(lambda e: e.get('type') != 'occurrence', events))

        return MicrosoftEvent(events), next_sync_token

    @requires_auth_token
    def _get_occurrence_details(self, serieMasterId, token=None, timeout=TIMEOUT):
        """
        Get all occurrences details from a serie master.
        See: https://docs.microsoft.com/en-us/graph/api/event-list-instances?view=graph-rest-1.0&tabs=http
        """
        url = f"/v1.0/me/events/{serieMasterId}/instances"
        headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % token}
        params = {
            'startDateTime': '2016-12-01T00:00:00Z',
            'endDateTime': '2030-1-01T00:00:00Z',
        }
        dummy, data, dummy = self.microsoft_service._do_request(url, params, headers, method='GET', timeout=timeout)
        return MicrosoftEvent(data.get('value', []))

    @requires_auth_token
    def get_events(self, sync_token=None, token=None, timeout=TIMEOUT):
        """
        Retrieve all the events that have changed (added/updated/removed) from Microsoft Outlook.
        This is done in 2 steps:
        1) get main changed events (so single events and serie masters)
        2) get occurrences linked to a serie masters (to retrieve all needed details such as iCalUId)
        """
        events, next_sync_token = self._get_events_delta(sync_token=sync_token, token=token, timeout=timeout)

        # get occurences details for all serie masters
        for master in filter(lambda e: e.type == 'seriesMaster', events):
            events |= self._get_occurrence_details(master.id, token=token, timeout=timeout)

        return events, next_sync_token

    @requires_auth_token
    def insert(self, values, token=None, timeout=TIMEOUT):
        url = "/v1.0/me/calendar/events"
        headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % token}
        dummy, data, dummy = self.microsoft_service._do_request(url, json.dumps(values, separators=(',', ':')), headers, method='POST', timeout=timeout)

        return data['id'], data['iCalUId']

    @requires_auth_token
    def patch(self, event_id, values, token=None, timeout=TIMEOUT):
        url = "/v1.0/me/calendar/events/%s" % event_id
        headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % token}
        try:
            status, dummy, dummy = self.microsoft_service._do_request(url, json.dumps(values, separators=(',', ':')), headers, method='PATCH', timeout=timeout)
        except requests.HTTPError:
            _logger.info("Microsoft event %s has not been updated", event_id)
            return False

        return status not in RESOURCE_NOT_FOUND_STATUSES

    @requires_auth_token
    def delete(self, event_id, token=None, timeout=TIMEOUT):
        url = "/v1.0/me/calendar/events/%s" % event_id
        headers = {'Authorization': 'Bearer %s' % token}
        params = {}
        try:
            status, dummy, dummy = self.microsoft_service._do_request(url, params, headers=headers, method='DELETE', timeout=timeout)
        except requests.HTTPError as e:
            # For some unknown reason Microsoft can also return a 403 response when the event is already cancelled.
            if e.response.status_code in (410, 403):
                status = e.response.status_code
                _logger.info("Microsoft event %s was already deleted", event_id)
            else:
                raise e

        return status not in RESOURCE_NOT_FOUND_STATUSES

    @requires_auth_token
    def answer(self, event_id, answer, values, token=None, timeout=TIMEOUT):
        # TODO BAR: update to be able to answer for an attendee through the organizer event
        url = "/v1.0/me/calendar/events/%s/%s" % (event_id, answer)
        headers = {'Content-type': 'application/json', 'Authorization': 'Bearer %s' % token}
        status, dummy, dummy = self.microsoft_service._do_request(url, json.dumps(values), headers, method='POST', timeout=timeout)

        return status not in RESOURCE_NOT_FOUND_STATUSES


    #####################################
    ##  MANAGE CONNEXION TO MICROSOFT  ##
    #####################################

    def is_authorized(self, user):
        return bool(user.sudo().microsoft_calendar_rtoken)

    def _get_calendar_scope(self):
        return 'offline_access openid Calendars.ReadWrite'

    def _microsoft_authentication_url(self, from_url='http://www.odoo.com'):
        return self.microsoft_service._get_authorize_uri(from_url, service='calendar', scope=self._get_calendar_scope())

    def _can_authorize_microsoft(self, user):
        return user.has_group('base.group_erp_manager')
