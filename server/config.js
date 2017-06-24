
const config = {
  defaultPort: 3000,
  errCodes: {
    badRequest: 400,
    unauthorized: 401,
    forbidden: 403,
    notFound: 404,
    serverError: 500,
  },
  mongo: {
    url: 'mongodb://writer:Qwerty11@ds161295.mlab.com:61295/soccer',
    otpions: {
      server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
      replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    },
  },
  jwtSecret: 'jwt-secret',
};


module.exports = config;
