Package.describe({
    name: 'intercom',
    summary: 'Intercom package',
    version: '0.1.0'
});

Package.onUse(function (api) {
    api.versionsFrom('0.9.4');
    api.addFiles('intercom_loader.js', 'client');
    api.addFiles('intercom_server.js', 'server');
    api.export('IntercomHash', 'server');
});
