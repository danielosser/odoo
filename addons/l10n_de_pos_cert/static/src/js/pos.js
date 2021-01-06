odoo.define('l10n_de_pos_cert.pos', function(require) {
    'use strict';

    const models = require('point_of_sale.models');
    const rpc = require('web.rpc');
    const {uuidv4, convertFromEpoch} = require('l10n_de_pos_cert.utils');
    const { TaxError } = require('l10n_de_pos_cert.errors');
    const core = require('web.core');
    const _t = core._t;

    const RATE_ID_MAPPING = {
        1: 'NORMAL',
        2: 'REDUCED_1',
        3: 'SPECIAL_RATE_1',
        4: 'SPECIAL_RATE_2',
        5: 'NULL',
    };

    models.load_fields('res.company', ['fiskaly_key', 'fiskaly_secret']);

    const _super_posmodel = models.PosModel.prototype;
    models.PosModel = models.PosModel.extend({
        // @Override
        initialize(attributes) {
            _super_posmodel.initialize.apply(this,arguments);
            this.token = '';
            this.vatRateMapping = {};
        },
        //@Override
        after_load_server_data() {
            if (this.isCountryGermany()) {
                rpc.query({
                    model: 'ir.config_parameter',
                    method: 'get_param',
                    args: ['fiskaly_kassensichv_api_url'],
                }).then(url => {
                    this.apiUrl = url;
                });

                rpc.query({
                    model: 'ir.config_parameter',
                    method: 'get_param',
                    args: ['fiskaly_dsfinvk_api_url'],
                }).then(url => {
                    this.initVatRates(url);
                })
            }
            return _super_posmodel.after_load_server_data.apply(this, arguments);
        },
        getApiToken() {
            return this.token;
        },
        setApiToken(token) {
            this.token = token;
        },
        getApiUrl() {
            return this.apiUrl;
        },
        getApiKey() {
            return this.company.fiskaly_key;
        },
        getApiSecret() {
            return this.company.fiskaly_secret;
        },
        getTssId() {
            return this.config.fiskaly_tss_id;
        },
        getClientId() {
            return this.config.fiskaly_client_id;
        },
        isCountryGermany() {
            return this.config.is_company_country_germany;
        },
        initVatRates(url) {
            const data = {
                'api_key': this.getApiKey(),
                'api_secret': this.getApiSecret()
            }

            $.ajax({
                url: url + 'auth',
                method: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then((data) => {
                const token = data.access_token;
                $.ajax({
                    url: url + 'vat_definitions',
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` },
                }).then((vat_data) => {
                    vat_data.data.forEach(vat_definition => {
                        if (!(vat_definition.percentage in this.vatRateMapping)) {
                            this.vatRateMapping[vat_definition.percentage] = RATE_ID_MAPPING[vat_definition.vat_definition_export_id];
                        }
                    })
                })
            })
        },
        //@Override
        async delete_current_order(){
            const order = this.get_order();
            if (this.isCountryGermany() && order && order.isTransactionStarted()) {
                await order.cancelTransaction()
                    .then(() => _super_posmodel.delete_current_order.apply(this, arguments))
                    .catch(error => this._triggerFiskalyCancelError(error))
            } else {
                _super_posmodel.delete_current_order.apply(this, arguments);
            }
        },
         _triggerFiskalyCancelError(error) {
            const message = {
                'noInternet': _t(
                    'Check the internet connection then try to validate or cancel the order. ' +
                    'Do not delete your browsing, cookies and cache data in the meantime !'
                ),
                'unknown': _t(
                    'An unknown error has occurred ! Try to validate this order or cancel it again. ' +
                    'Please contact Odoo for more information.'
                )
            };
            this.chrome.showFiskalyErrorPopup(error, message);
        }
    });

    const _super_order = models.Order.prototype;
    models.Order = models.Order.extend({
        // @Override
        initialize() {
            _super_order.initialize.apply(this,arguments);
            if (this.pos.isCountryGermany()) {
                this.fiskalyUuid = this.fiskalyUuid || null;
                this.txLastRevision = this.txLastRevision || null;
                this.transactionState = this.transactionState || 'inactive'; // Used to know when we need to create the fiskaly transaction
                this.tssInformation = this.tssInformation || this._initTssInformation();
                this.save_to_db();
            }
        },
        _initTssInformation() {
            return {
                'transaction_number': { 'name': 'TSE-Transaktion', 'value': null },
                'time_start': { 'name': 'TSE-Start', 'value': null },
                'time_end': { 'name': 'TSE-Stop', 'value': null },
                'certificate_serial': { 'name': 'TSE-Seriennummer', 'value': null },
                'timestamp_format': { 'name': 'TSE-Zeitformat', 'value': null },
                'signature_value': { 'name': 'TSE-Signatur', 'value': null },
                'signature_algorithm': { 'name': 'TSE-Hashalgorithmus', 'value': null },
                'signature_public_key': { 'name': 'TSE-PublicKey', 'value': null },
                'client_serial_number': { 'name': 'ClientID / KassenID', 'value': null },
                'erstBestellung': { 'name': 'TSE-Erstbestellung', 'value': null }
            };
        },
        isTransactionInactive() {
            return this.transactionState === 'inactive';
        },
        transactionStarted() {
            this.transactionState = 'started';
        },
        isTransactionStarted() {
            return this.transactionState === 'started';
        },
        transactionFinished() {
            this.transactionState = 'finished';
        },
        isTransactionFinished() {
            return this.transactionState === 'finished';
        },
        setLastRevision(revision) {
            this.txLastRevision = revision;
        },
        getLastRevision() {
            return this.txLastRevision;
        },
        // @Override
        export_for_printing() {
            const receipt = _super_order.export_for_printing.apply(this, arguments);
            if (this.pos.isCountryGermany() && this.isTransactionFinished()) {
                receipt['tss'] = {};
                $.extend(true, receipt['tss'], this.tssInformation);
            }
            return receipt;
        },
        //@Override
        export_as_JSON() {
            const json = _super_order.export_as_JSON.apply(this, arguments);
            if (this.pos.isCountryGermany()) {
                json['fiskaly_uuid'] = this.fiskalyUuid;
                json['transaction_state'] = this.transactionState;
                if (this.txLastRevision) {
                    json['last_revision'] = this.txLastRevision;
                }
                json['tss_info'] = {};
                for (var key in this.tssInformation) {
                    if (key !== 'erstBestellung') {
                        json['tss_info'][key] = this.tssInformation[key].value;
                    }
                }
            }
            return json;
        },
        //@Override
        init_from_JSON(json) {
            _super_order.init_from_JSON.apply(this, arguments);
            if (this.pos.isCountryGermany()) {
                this.fiskalyUuid = json.fiskaly_uuid;
                this.transactionState = json.transaction_state;
                if (json.last_revision) {
                    this.txLastRevision = json.last_revision;
                }
                if (json.tss_info) {
                    this.tssInformation = this._initTssInformation();
                    for (var key in json.tss_info) {
                        this.tssInformation[key].value = json.tss_info[key];
                    }
                    if (this.get_orderlines().length > 0) {
                        this.tssInformation.erstBestellung.value = this.get_orderlines()[0].get_product().display_name;
                    }
                }
            }
        },
        //@Override
        add_product(product, options) {
            if (this.pos.isCountryGermany()) {
                if (product.taxes_id.length === 0 || !(this.pos.taxes_by_id[product.taxes_id[0]].amount in this.pos.vatRateMapping)) {
                    throw new TaxError(product);
                }
            }
            _super_order.add_product.apply(this, arguments);
        },
        _authenticate() {
            const data = {
                'api_key': this.pos.getApiKey(),
                'api_secret': this.pos.getApiSecret()
            }

            return $.ajax({
                url: this.pos.getApiUrl() + 'auth',
                method: 'POST',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then((data) => {
                this.pos.setApiToken(data.access_token);
            }).fail((error) => {
                error.source = 'authenticate';
                return Promise.reject(error);
            });
        },
        async createTransaction() {
            if (!this.pos.getApiToken()) {
                await this._authenticate(); //  If there's an error, a promise is created with a rejected value
            }

            const transactionUuid = uuidv4();
            const data = {
                'state': 'ACTIVE',
                'client_id': this.pos.getClientId()
            };

            return $.ajax({
                url: `${this.pos.getApiUrl()}tss/${this.pos.getTssId()}/tx/${transactionUuid}`,
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${this.pos.getApiToken()}` },
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then((data) => {
                this.fiskalyUuid = transactionUuid;
                this.txLastRevision = data.latest_revision;
                this.transactionStarted();
                this.trigger('change');
            }).fail(async (error) => {
                if (error.status === 401) {  // Need to update the token
                    await this._authenticate();
                    return this.createTransaction();
                }
                // Return a Promise with rejected value for errors that are not handled here
                return Promise.reject(error);
            });
        },
        /*
         *  Return an array of { 'vat_rate': ..., 'amount': ...}
         */
        _createAmountPerVatRateArray() {
            const rateIds = {
                'NORMAL': [],
                'REDUCED_1': [],
                'SPECIAL_RATE_1': [],
                'SPECIAL_RATE_2': [],
                'NULL': [],
            };
            this.get_tax_details().forEach((detail) => {
                rateIds[this.pos.vatRateMapping[detail.tax.amount]].push(detail.tax.id);
            });
            const amountPerVatRate = { 'NORMAL': 0, 'REDUCED_1': 0, 'SPECIAL_RATE_1': 0, 'SPECIAL_RATE_2': 0, 'NULL': 0 };
            for (var rate in rateIds) {
                rateIds[rate].forEach((id) => {
                    amountPerVatRate[rate] += this.get_total_for_taxes(id);
                });
            }
            return Object.keys(amountPerVatRate).filter((rate) => !!amountPerVatRate[rate])
                .map((rate) => ({ 'vat_rate': rate, 'amount': amountPerVatRate[rate].toFixed(2) }));
        },
        /*
         *  Return an array of { 'payment_type': ..., 'amount': ...}
         */
        _createAmountPerPaymentTypeArray() {
            const amountPerPaymentTypeArray = [];
            this.get_paymentlines().forEach((line) => {
                amountPerPaymentTypeArray.push({
                    'payment_type': line.get_type() === 'cash' ? 'CASH' : 'NON_CASH',
                    'amount' : line.amount.toFixed(2)
                 });
            });
            const change = this.get_change();
            if (!!change) {
                amountPerPaymentTypeArray.push({
                    'payment_type': 'CASH',
                    'amount': (-change).toFixed(2)
                });
            }
            return amountPerPaymentTypeArray;
        },
        _updateTimeStart(seconds) {
            this.tssInformation.time_start.value = convertFromEpoch(seconds);
        },
        _updateTssInfo(data) {
            this.tssInformation.transaction_number.value = data.number;
            this._updateTimeStart(data.time_start);
            this.tssInformation.time_end.value = convertFromEpoch(data.time_end);
            this.tssInformation.certificate_serial.value = data.certificate_serial;
            this.tssInformation.timestamp_format.value = data.log.timestamp_format;
            this.tssInformation.signature_value.value = data.signature.value;
            this.tssInformation.signature_algorithm.value = data.signature.algorithm;
            this.tssInformation.signature_public_key.value = data.signature.public_key;
            this.tssInformation.client_serial_number.value = data.client_serial_number;
            this.tssInformation.erstBestellung.value = this.get_orderlines()[0].get_product().display_name;
            this.transactionFinished();
        },
        async finishShortTransaction() {
            if (!this.pos.getApiToken()) {
                await this._authenticate();
            }

            const amountPerVatRateArray = this._createAmountPerVatRateArray();
            const amountPerPaymentTypeArray = this._createAmountPerPaymentTypeArray();
            const data = {
                'state': 'FINISHED',
                'client_id': this.pos.getClientId(),
                'schema': {
                    'standard_v1': {
                        'receipt': {
                            'receipt_type': 'RECEIPT',
                            'amounts_per_vat_rate': amountPerVatRateArray,
                            'amounts_per_payment_type': amountPerPaymentTypeArray
                        }
                    }
                }
            };
            return $.ajax({
                headers: { 'Authorization': `Bearer ${this.pos.getApiToken()}` },
                url: `${this.pos.getApiUrl()}tss/${this.pos.getTssId()}/tx/${this.fiskalyUuid}?last_revision=${this.txLastRevision}`,
                method: 'PUT',
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).then((data) => {
                this._updateTssInfo(data);
            }).fail(async (error) => {
                if (error.status === 401) {  // Need to update the token
                    await this._authenticate();
                    return this.finishShortTransaction();
                }
                // Return a Promise with rejected value for errors that are not handled here
                return Promise.reject(error);
            });;
        },
        async cancelTransaction() {
            if (!this.pos.getApiToken()) {
                await this._authenticate();
            }

            const data = {
                'state': 'CANCELLED',
                'client_id': this.pos.getClientId(),
                'schema': {
                    'standard_v1': {
                        'receipt': {
                            'receipt_type': 'CANCELLATION',
                            'amounts_per_vat_rate': []
                       }
                    }
                }
            };

            return $.ajax({
                url: `${this.pos.getApiUrl()}tss/${this.pos.getTssId()}/tx/${this.fiskalyUuid}?last_revision=${this.txLastRevision}`,
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${this.pos.getApiToken()}` },
                data: JSON.stringify(data),
                contentType: 'application/json'
            }).fail(async (error) => {
                if (error.status === 401) {  // Need to update the token
                    await this._authenticate();
                    return this.cancelTransaction();
                }
                // Return a Promise with rejected value for errors that are not handled here
                return Promise.reject(error);
            });
        }
    });
});
