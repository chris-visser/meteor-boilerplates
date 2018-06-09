'use strict';

module.exports.redirect = (event, context, callback) => {
  const response = {
    statusCode: 301,
    headers: {
      'Location': 'https://www.cloudspider.io',
      Link: `<https://www.cloudspider.io>; rel="canonical"`
    }
  };

  callback(null, response);
};
