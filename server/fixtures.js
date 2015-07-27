if (Posts.find().count() === 0) {
    var now = new Date().getTime();

    var tomId = Meteor.users.insert({
        profile: { name: 'Tom Coleman' }
    });
    var tom = Meteor.users.findOne(tomId);

    var sachaId = Meteor.users.insert({
        profile: { name: 'Sacha Greif' }
    });
    var sacha = Meteor.users.findOne(sachaId);

    var steveId = Accounts.createUser({
        username: 'steve',
        password: 'abc123',
        profile: { name: 'Steve' }
    });
    var steve = Meteor.users.findOne(steveId);

    var joeId = Accounts.createUser({
        username: 'joe',
        password: 'abc123',
        profile: { name: 'joe' }
    });
    var joe = Meteor.users.findOne(joeId);

    var telescopeId = Posts.insert({
        title: 'Introducing Telescope',
        userId: sacha._id,
        author: sacha.profile.name,
        url: 'http://sachagreif.com/introducing-telescope/',
        submitted: new Date(now - 7 * 3600 * 1000)
    });

    Comments.insert({
        postId: telescopeId,
        userId: tom._id,
        author: tom.profile.name,
        submitted: new Date(now - 5 * 3600 * 1000),
        body: 'Interesting project Sacha, can I get involved?'
    });

    Comments.insert({
        postId: telescopeId,
        userId: sacha._id,
        author: sacha.profile.name,
        submitted: new Date(now - 3 * 3600 * 1000),
        body: 'you sure can Tom!'
    });

    Posts.insert({
        title: 'Meteor',
        userId: tom._id,
        author: tom.profile.name,
        url: 'http://meteor.com',
        submitted: new Date(now - 10 * 3600 * 1000)
    });

    Posts.insert({
        title: 'The Meteor Book',
        userId: tom._id,
        author: tom.profile.name,
        submitted: new Date(now - 12 * 3600 * 1000),
        url: 'http://themeteorbook.com'
    });

    Posts.insert({
        title: 'Bikes are fun.',
        userId: joe._id,
        author: joe.profile.name,
        submitted: new Date(now - 14 * 3600 * 1000),
        url: 'http://www.bikes.com'
    });

    Posts.insert({
        title: 'Go sailing.',
        userId: steve._id,
        author: steve.profile.name,
        submitted: new Date(now - 9 * 3600 * 1000),
        url: 'http://www.sailboat.com'
    });
}