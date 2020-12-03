function errorHandler(err, req, res, next) {
  let is404 = false;
  let statusCode = 400;
  switch (true) {
    case typeof err === 'string':
      // custom application error
      is404 = err.toLowerCase().endsWith('not found');
      statusCode = is404 ? 404 : 400;
      return res.status(statusCode).json({ message: err });
    case err.name === 'ValidationError':
      // mongoose validation error
      return res.status(400).json({ message: err.message });
    case err.name === 'UnauthorizedError':
      // jwt authentication error
      return res.status(401).json({ message: 'Unauthorized' });
    default:
      return res.status(500).json({ message: err.message });
  }
}

export default errorHandler;
