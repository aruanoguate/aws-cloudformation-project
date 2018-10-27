var helper = require('./helper');
var mysqldb = require('../mysql-db');

module.exports.get = function (wagner) {
    return function (req, res) {
        mysqldb.get.select(wagner, 'main', 'select * from photo;', []).then(function(result){
            return res.json({ result });
        }).catch(function(error){
            return helper.genericErrorHandler(res, error);
        });
    };
};

module.exports.getbyid = function (wagner) {
    return function (req, res) {
        mysqldb.get.select(wagner, 'main', 'select * from photo where id = ?;', [req.params.id]).then(function(result){
            return res.json({ result });
        }).catch(function(error){
            return helper.genericErrorHandler(res, error);
        });
    };
};

// module.exports.post = function (category) {
//     return function (req, res) {
//         return crud.genericPostHandler(category, res, req.body.category, function (categoryDocument) {
//             // Return a success message
//             return res.json({ message: 'Successfully created', category: categoryDocument });
//         });
//     };
// };

// module.exports.put = function (category) {
//     return function (req, res) {
//         var updateActions = {
//             $set: {
//                 name: req.body.category.name
//             }
//         };
//         return crud.genericPutHandler(category, res, req.body.category._id, updateActions, function (categoryDocument) {
//             // Return a success message
//             return res.json({ message: 'Successfully updated', category: categoryDocument });
//         });
//     };
// };

// module.exports.delete = function (category, execution, user) {
//     return function (req, res) {
//         return crud.genericGetByIdHandler(category, res, req.params.id, null, function (categoryDocument) {

//             var objectToFind = {
//                 categories: { $in: [categoryDocument._id] }
//             }

//             execution.find(objectToFind, function (error, executionsFound) {
//                 if (error)
//                     return helper.genericErrorHandler(res, error);

//                 // To review if the category is assigned to at least one execution
//                 if (executionsFound) {
//                     if (executionsFound.length > 0)
//                         return helper.genericCantDeleteHandler(res, 'Executions should be removed from category before deletion.');
//                 }

//                 user.find(objectToFind, function (error, usersFound) {
//                     if (error)
//                         return helper.genericErrorHandler(res, error);

//                     // To review if the category is assigned to at least one execution
//                     if (usersFound) {
//                         if (usersFound.length > 0)
//                             return helper.genericCantDeleteHandler(res, 'Users should be removed from category before deletion.');
//                     }

//                     // To delete the category and return success
//                     categoryDocument.remove();
//                     // Return a success message
//                     return res.json({ message: 'Successfully deleted' });
//                 });
//             });

//         });
//     };
// };
