import isFunction from 'lodash/isFunction';
import mongoose from 'mongoose';
import logger from '../logger';

// http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise;
export default function connect(uri, options, cb) {
  // http://mongodb.github.io/node-mongodb-native/2.0/api/Server.html#connections
  options.server = options.server ? options.server : {
    socketOptions: { keepAlive: 1 },
  };
  options.auto_reconnect = true;

  const connect = mongoose.createConnection(uri, options);

  // CONNECTION EVENTS
  // When successfully connected
  connect.on('connected', () => {
    logger.info(`Mongoose default connection open to ${uri}`);
    isFunction(cb) && cb();
  });

  // If the connection throws an error
  connect.on('error', (err) => {
    logger.error(`Failed to connect to DB ${uri} on startup ${err.message}`);
  });

  // When the connection is disconnected
  connect.on('disconnected', () => {
    logger.warning(`Mongoose default connection to DB : ${uri} disconnected`);
  });

  const gracefulExit = function () {
    connect.close(() => {
      logger.info(`Mongoose default connection with DB : ${uri} is disconnected through app termination`);
      process.exit(0);
    });
  };
  // If the Node process ends, close the Mongoose connection
  process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

  return connect;
}
