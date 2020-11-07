const HttpStatus = require('http-status-codes');

exports.successResponse = (res) => res.status(HttpStatus.OK).json();

exports.successResponseWithData = (res, data) => res.status(HttpStatus.OK).json(data);

exports.createdResponse = (res, data) => res.status(HttpStatus.CREATED).json(data);

exports.createdResponseWithData = (res, data) => res.status(HttpStatus.CREATED).json(data);

exports.errorResponse = (res, error) => res.status(HttpStatus.INTERNAL_SERVER_ERROR)
  .json({ error, message: error.message });

exports.notFoundResponse = (res, error) => res.status(HttpStatus.NOT_FOUND).json({
  error, message: error.message,
});

exports.validationErrorResponse = (res, error) => res.status(HttpStatus.BAD_REQUEST)
  .json({ error, message: error.message });

exports.unauthorizedResponse = (res, error) => res.status(HttpStatus.UNAUTHORIZED)
  .json({ error, message: error.message });

exports.forbiddenResponse = (res, error) => res.status(HttpStatus.FORBIDDEN)
  .json({ error, message: error.message });
