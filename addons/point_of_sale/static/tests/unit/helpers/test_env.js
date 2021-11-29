odoo.define('point_of_sale.test_env', async function (require) {
    'use strict';

    /**
     * Many components in PoS are dependent on the PosGlobalState instance (pos).
     * Therefore, for unit tests that require pos in the Components' env, we
     * prepared here a test env maker (makePosTestEnv) based on
     * makeTestEnvironment of web.
     */

    const makeTestEnvironment = require('web.test_env');
    const env = require('web.env');
    const models = require('point_of_sale.models');
    const Registries = require('point_of_sale.Registries');
    const cleanup = require("@web/../tests/helpers/cleanup");

    // We override this method in the pos unit tests to prevent the unnecessary error in the web tests.
    cleanup.registerCleanup = () => {}

    Registries.Component.add(owl.misc.Portal);

    await env.session.is_bound;
    const ExtendedPosModel = Registries.PosModelRegistry.get(models.PosGlobalState);
    const pos = new ExtendedPosModel();
    pos.rpc = env.services.rpc.bind(env.services);
    pos.session = env.session;
    pos.do_action = async () => {};
    pos.showLoadingSkip = () => {};
    await pos.load_server_data();

    /**
     * @param {Object} env default env
     * @param {Function} providedRPC mock rpc
     * @param {Function} providedDoAction mock do_action
     */
    function makePosTestEnv(env = {}, providedRPC = null, providedDoAction = null) {
        env = Object.assign(env, { pos });
        let posEnv = makeTestEnvironment(env, providedRPC);
        // Replace rpc in the PosGlobalState instance after loading
        // data from the server so that every succeeding rpc calls
        // made by pos are mocked by the providedRPC.
        pos.rpc = posEnv.rpc;
        pos.do_action = providedDoAction;
        return posEnv;
    }

    return makePosTestEnv;
});
