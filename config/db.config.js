module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "school_db",
  dialect: "mysql",
  pool: {
    // maximum number of connections to db pool
    max: 5,
    // minimum number of connections to db pool
    min: 0,
    //maximum time(milliseconds)  that the db pool tries to connect
    acquire: 300000,
    //maximum time(milliseconds)  that a connection is dormant
    idle: 10000,
  },
};
