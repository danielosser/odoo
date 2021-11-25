{
    'name' : 'IM Bus',
    'version': '1.0',
    'category': 'Hidden',
    'complexity': 'easy',
    'description': "Instant Messaging Bus allow you to send messages to users, in live.",
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
    ],
    'installable': True,
    'assets': {
        'web.assets_backend': [
            'bus/static/src/**/*',
            ('remove', 'bus/static/src/js/workers/*'),
        ],
        'web.assets_frontend': [
            'bus/static/src/js/websocket_errors.js',
            'bus/static/src/js/services/websocket_communication.js',
            'bus/static/src/js/services/bus_service.js',
            'bus/static/src/js/websocket_bus.js',
        ],
        'web.qunit_suite_tests': [
            'bus/static/tests/*.js',
        ],
    },
    'license': 'LGPL-3',
}
