Accounts.onCreateUser(function (options, user) {
    user.intercomHash = IntercomHash(user, 'peXzYj_11o8DYZW7W16aJKfHjNE-YWFds4Xj0IAp');

    if (options.profile) {
        user.profile = options.profile;
    }

    return user;
});
