Tracker.autorun(function () {
    if (Meteor.user() && !Meteor.loggingIn()) {
        var intercomSettings = {
            app_id: 'gncvnsqc',
            name: Meteor.user().username,
            email: Meteor.user().emails[0].address,
            created_at: Math.round(Meteor.user().createdAt/1000), // div by 1000 to convert from mongo time to unix time
            favorite_color: _.sample(['blue', 'red', 'green', 'yellow'])    // practice using a custom field with intercom
        };
        Intercom('boot', intercomSettings);
    }
});
