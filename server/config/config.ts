export default {
  bot: {
    token: '7397117711:AAH9WzSJ_xlDbad-6gQmf_kMcLkVJgXd3lo',
  },
  mongo: {
    url: `mongodb://${process.env.mongoDomain || '127.0.0.1'}:27017/`,
    options: {
      dbName: 'db_b',
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwtSecret: "super_secret_jwt_key",
  server: {
    port: 8080,
    dev_port: 6008,
  },
};
