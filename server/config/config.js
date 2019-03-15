//This file holds any configuration variables we may need
//'config.js' is typically ignored by git to protect sensitive information, such as your database's username and password

module.exports = {
  db: {
    uri: 'mongodb://alex:alexuf1@ds221115.mlab.com:21115/alexblauth', //place the URI of your mongo database here.
  },
  port: process.env.PORT || 8080
};
