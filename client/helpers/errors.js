Errors = new Mongo.Collection(null);


displayClientError  = function (message) {
    Errors.insert({ message: message });
};