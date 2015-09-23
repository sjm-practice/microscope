var crypto = Npm.require('crypto');

IntercomHash = function (user, secret) {
    var secretHash = new Buffer(secret, 'utf8');

    return crypto.createHmac('sha256', secretHash).update(user._id).digest('hex');
};
