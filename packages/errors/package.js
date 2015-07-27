Package.describe({
    name: 'smarsh:errors',
    version: '1.0.0',
    summary: 'A pattern to display application errors to the user'
});

Package.onUse(function (api) {
    api.versionsFrom('0.9.0');
    api.addFiles(['errors.js', 'errors_list.html', 'errors_list.js'], 'client');
    api.use(['minimongo', 'mongo-livedata', 'templating'], 'client');
    if (api.export) {
        api.export('Errors');
    }
});
