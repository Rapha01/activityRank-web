const keys = {
  production: {
    managerApiAuth: '',
    managerHost: '',
    managerDb: {
      dbUser: '',
      dbPassword: '',
      dbName: ''
    },
    paypal: {
      clientId: '',
      secret: ''
    }
  },
  development: {
    managerApiAuth: '',
    managerHost: '',
    managerDb: {
      dbUser: '',
      dbPassword: '',
      dbName: ''
    },
    paypal: {
      clientId: '',
      secret: ''
    }
  }
};

module.exports.get = () => {
  if (process.env.NODE_ENV == 'production')
    return keys.production;
  else
    return keys.development;
}
