# -*- coding: utf-8 -*-

{
    'name': 'Discuss',
    'version': '1.0',
    'category': 'Discuss',
    'summary': 'Chat, mail gateway and private channels',
    'description': "",
    'website': 'https://www.odoo.com/page/discuss',
    'depends': ['base', 'base_setup', 'bus', 'web_tour'],
    'data': [
        'wizard/invite_view.xml',
        'wizard/mail_compose_message_view.xml',
        'wizard/mail_resend_cancel_views.xml',
        'wizard/mail_resend_message_views.xml',
        'views/mail_message_subtype_views.xml',
        'views/mail_tracking_views.xml',
        'views/mail_message_views.xml',
        'views/mail_mail_views.xml',
        'views/mail_followers_views.xml',
        'views/mail_channel_views.xml',
        'views/mail_shortcode_views.xml',
        'views/mail_activity_views.xml',
        'views/res_config_settings_views.xml',
        'data/mail_data.xml',
        'data/mail_channel_data.xml',
        'data/mail_activity_data.xml',
        'data/ir_cron_data.xml',
        'security/mail_security.xml',
        'security/ir.model.access.csv',
        'views/mail_alias_views.xml',
        'views/res_users_views.xml',
        'views/mail_templates.xml',
        'wizard/email_template_preview_view.xml',
        'views/mail_template_views.xml',
        'views/mail_moderation_views.xml',
        'views/ir_actions_views.xml',
        'views/ir_model_views.xml',
        'views/res_partner_views.xml',
        'views/mail_blacklist_views.xml',
        'views/mail_channel_partner_views.xml',
    ],
    'demo': [
        'data/mail_demo.xml',
        'data/mail_channel_demo.xml',
    ],
    'installable': True,
    'application': True,
    'qweb': [
        'static/src/xml/activity.xml',
        'static/src/xml/activity_view.xml',
        'static/src/xml/composer.xml',
        'static/src/xml/chatter.xml',
        'static/src/xml/discuss.xml',
        'static/src/xml/followers.xml',
        'static/src/xml/systray.xml',
        'static/src/xml/thread.xml',
        'static/src/xml/abstract_thread_window.xml',
        'static/src/xml/thread_window.xml',
        'static/src/xml/announcement.xml',
        'static/src/xml/user_menu.xml',
        'static/src/xml/web_kanban_activity.xml',

        'static/src/xml/owl/component/attachment.xml',
        'static/src/xml/owl/component/attachment_list.xml',
        'static/src/xml/owl/component/attachment_viewer.xml',
        'static/src/xml/owl/component/autocomplete_input.xml',
        'static/src/xml/owl/component/chat_window.xml',
        'static/src/xml/owl/component/chat_window_header.xml',
        'static/src/xml/owl/component/chat_window_hidden_menu.xml',
        'static/src/xml/owl/component/chat_window_manager.xml',
        'static/src/xml/owl/component/chatter.xml',
        'static/src/xml/owl/component/chatter_attachment_box.xml',
        'static/src/xml/owl/component/composer.xml',
        'static/src/xml/owl/component/composer_text_input.xml',
        'static/src/xml/owl/component/dialog.xml',
        'static/src/xml/owl/component/dialog_manager.xml',
        'static/src/xml/owl/component/discuss.xml',
        'static/src/xml/owl/component/discuss_mobile_mailbox_selection.xml',
        'static/src/xml/owl/component/discuss_mobile_navbar.xml',
        'static/src/xml/owl/component/discuss_sidebar.xml',
        'static/src/xml/owl/component/discuss_sidebar_item.xml',
        'static/src/xml/owl/component/editable_text.xml',
        'static/src/xml/owl/component/emojis_button.xml',
        'static/src/xml/owl/component/emojis_popover.xml',
        'static/src/xml/owl/component/message.xml',
        'static/src/xml/owl/component/message_list.xml',
        'static/src/xml/owl/component/systray_messaging_menu.xml',
        'static/src/xml/owl/component/thread.xml',
        'static/src/xml/owl/component/thread_icon.xml',
        'static/src/xml/owl/component/thread_preview.xml',
        'static/src/xml/owl/component/thread_preview_list.xml',
        'static/src/xml/owl/component/user_status.xml',
        'static/src/xml/owl/widget/common.xml',
        'static/src/xml/owl/widget/discuss.xml',
        'static/src/xml/owl/widget/discuss_invite_partner_dialog.xml',
        'static/src/xml/owl/widget/systray_messaging_menu.xml',
    ],
}
