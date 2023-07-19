const AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const websocket = require('./websocket.js');

exports.handler = async function (event, context) {
  let connections;

  try {
    connections = await ddb.scan({ TableName: process.env.table }).promise();
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
    };
  }  
  
  let promises = [];
  
  for (let record of event.Records) {
    if (record.eventName === 'INSERT') {
      promises.push(websocket.sendNotification(record, connections));
    }
  };
  
  await Promise.all(promises);

  return { 
    statusCode: 200 
  };
};