// root configuration file
module.exports = {
  /**
   *
   *  Local / Development
   *
   *  @url {NA}
   */
  development: {
    defaults: {
      NODE_ENV: 'DEVELOPMENT',
      DEBUG: 'TRUE'
    },
    directories: {
      'client': {
        _envPrefix: 'REACT_APP_'
      },
      'rest-server': {
        host: 'http://localhost',
        port: '4990',
        mongo_host: 'mongodb://localhost',
        mongo_db_name: 'codesling',
        mongo_port: 27017,
        token_secret: 'insert secret here'
      },
      'socket-server': {
        host: 'http://localhost',
        port: '4155'
      },
      'coderunner-service': {
        host: 'http://localhost',
        port: '4000'
      }
    }
  }
};
