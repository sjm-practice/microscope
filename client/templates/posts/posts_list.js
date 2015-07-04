var postsData = [
    {
        title: 'Introducing Telescope',
        url: 'http://sachagreif.com/introducing-telescope/'
    },
    {
        title: 'Meteor',
        url: 'http://meteor.com'
    },
    {
        title: 'The Meteor Book',
        url: 'http://themeteorbook.com'
    },
    {
        title: 'Yet Another Book',
        url: 'http://www.somewhere.com'
    }
];

Template.postsList.helpers({
    posts: postsData
});