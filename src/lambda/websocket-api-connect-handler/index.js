const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const queryString = require('querystring');

exports.handler = async function (event, context) {
  const queryStringParameters = queryString.stringify(event.queryStringParameters);
  console.log('QueryString: ', queryStringParameters);

  const allowedDomainPattern = /\.ucedo\.io$/;
  const requestOrigin = event.headers['Origin'];

  if (!requestOrigin || !allowedDomainPattern.test(requestOrigin)) {
   return {
     statusCode: 403,
     body: JSON.stringify({ message: 'Unauthorized access' }),
     headers: {
       'Content-Type': 'application/json',
     },
   };
  }

  try {
    await ddb
      .put({
        TableName: process.env.table,
        Item: {
          connectionId: event.requestContext.connectionId,
          queryString: queryStringParameters
        },
      })
      .promise();
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
    };
  }

  return {
    statusCode: 200,
  };
};