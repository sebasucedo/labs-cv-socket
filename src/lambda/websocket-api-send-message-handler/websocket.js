const AWS = require('aws-sdk');

async function sendNotification(record, connections) {
  let newImage = record.dynamodb.NewImage;
  let id = newImage.Id.S;
  let message = newImage.Body.S;
  
  const websocket = process.env.websocket;

  const callbackAPI = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint: websocket
  });
      
  const sendMessages = connections.Items.map(async ({ connectionId, queryString }) => {
    if (queryString === id) {
      try {
        await callbackAPI
          .postToConnection({ ConnectionId: connectionId, Data: message })
          .promise();
      } catch (e) {
        console.log(e);
      }
    }
  });

  try {
    await Promise.all(sendMessages);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
    sendNotification
}
