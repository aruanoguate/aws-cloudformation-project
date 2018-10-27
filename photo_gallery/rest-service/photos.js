var helper = require('./helper');
var crud = require('./crud');

// Fields to be pulled from mongoDB for display operations
var fieldsToShow = '_id name';

module.exports.get = function (category) {
    return function (req, res) {
        return crud.genericGetHandler(category, res, fieldsToShow, function (allCategories) {
            return res.json({ categories: allCategories });
        });
    };
};

module.exports.getbyid = function (category) {
    return function (req, res) {
        return crud.genericGetByIdHandler(category, res, req.params.id, fieldsToShow, function (categoryFound) {
            return res.json({ category: categoryFound });
        });
    };
};

module.exports.post = function (category) {
    return function (req, res) {
        return crud.genericPostHandler(category, res, req.body.category, function (categoryDocument) {
            // Return a success message
            return res.json({ message: 'Successfully created', category: categoryDocument });
        });
    };
};

module.exports.put = function (category) {
    return function (req, res) {
        var updateActions = {
            $set: {
                name: req.body.category.name
            }
        };
        return crud.genericPutHandler(category, res, req.body.category._id, updateActions, function (categoryDocument) {
            // Return a success message
            return res.json({ message: 'Successfully updated', category: categoryDocument });
        });
    };
};

module.exports.delete = function (category, execution, user) {
    return function (req, res) {
        return crud.genericGetByIdHandler(category, res, req.params.id, null, function (categoryDocument) {

            var objectToFind = {
                categories: { $in: [categoryDocument._id] }
            }

            execution.find(objectToFind, function (error, executionsFound) {
                if (error)
                    return helper.genericErrorHandler(res, error);

                // To review if the category is assigned to at least one execution
                if (executionsFound) {
                    if (executionsFound.length > 0)
                        return helper.genericCantDeleteHandler(res, 'Executions should be removed from category before deletion.');
                }

                user.find(objectToFind, function (error, usersFound) {
                    if (error)
                        return helper.genericErrorHandler(res, error);

                    // To review if the category is assigned to at least one execution
                    if (usersFound) {
                        if (usersFound.length > 0)
                            return helper.genericCantDeleteHandler(res, 'Users should be removed from category before deletion.');
                    }

                    // To delete the category and return success
                    categoryDocument.remove();
                    // Return a success message
                    return res.json({ message: 'Successfully deleted' });
                });
            });

        });
    };
};
