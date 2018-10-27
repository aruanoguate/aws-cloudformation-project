var _ = require('underscore');
var status = require('http-status');

module.exports.genericErrorHandler = function (res, error) {
  return res.
    status(status.INTERNAL_SERVER_ERROR).
    json({ error: error.toString() });
};

module.exports.genericNotFoundHandler = function (res) {
  return res.
    status(status.NOT_FOUND).
    json({ error: 'Not found' });
};

module.exports.genericIncorrectParametersHandler = function (res) {
  return res.
    status(status.UNPROCESSABLE_ENTITY).
    json({ error: 'Input parameter not found' });
};

module.exports.genericInsufficientPermissionHandler = function (res) {
  return res.
    status(status.UNAUTHORIZED).
    json({ error: 'Current user can\'t perform this action' });
};

module.exports.genericCantDeleteHandler = function (res, additionalExplanation) {
  return res.
    status(status.METHOD_NOT_ALLOWED).
    json({ error: 'The current object can\'t be deleted. ' + additionalExplanation });
};

module.exports.isExecutionValidForUser = function (user, executionToSearch) {
  // We should look for the execution on all the 
  // categories that are asigned to the user
  var executions = [];
  _.each(user.categories, function (category) {
    executions = executions.concat(category.executions);
  });
  return _.findWhere(executions, executionToSearch);
};
