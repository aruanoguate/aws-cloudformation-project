var helper = require('./helper');

// Returns a function to be called as generic callback for all CRUD operations
function genericCrudHandler(res, id, crudOperation) {
    try {
        if (!id)
            return helper.genericIncorrectParametersHandler(res);

        crudOperation();
    }
    catch (error) {
        return helper.genericErrorHandler(res, error);
    }
}

// Returns a function to be called as generic callback for all CRUD operations
module.exports.genericCrudCallback = function (res, callback) {
    return function (error, document) {
        if (error)
            return helper.genericErrorHandler(res, error);
        if (!document)
            return helper.genericNotFoundHandler(res);

        return callback(document);
    };
}

// This method should return all the documents associated to a specified model
module.exports.genericGetHandler = function (model, res, fields, callback) {
    try {
        model.find({}, fields, module.exports.genericCrudCallback(res, callback));
    }
    catch (error) {
        return helper.genericErrorHandler(res, error);
    }
};

// This function containd the basic structure to handle a GetByID operation
module.exports.genericGetByIdHandler = function (model, res, id, fields, callback) {
    var crudOperation = function () {
        model.findById(id, fields, module.exports.genericCrudCallback(res, callback));
    };
    return genericCrudHandler(res, id, crudOperation);
};

// This function containd the basic structure to handle a Post operation
module.exports.genericPostHandler = function (model, res, object, callback) {
    var crudOperation = function () {
        model.create(object, module.exports.genericCrudCallback(res, callback));
    };
    return genericCrudHandler(res, object, crudOperation);
};

// This function containd the basic structure to handle a Put operation
module.exports.genericPutHandler = function (model, res, id, updateActions, callback) {
    var crudOperation = function () {
        model.findByIdAndUpdate(id, updateActions, { new: true }, module.exports.genericCrudCallback(res, callback));
    };
    return genericCrudHandler(res, id, crudOperation);
};

// This function containd the basic structure to handle a Delete operation
module.exports.genericDeleteHandler = function (model, res, id, callback) {
    var crudOperation = function () {
        model.findByIdAndRemove(id, module.exports.genericCrudCallback(res, callback));
    };
    return genericCrudHandler(res, id, crudOperation);
};

