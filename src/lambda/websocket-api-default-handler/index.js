const AWS = require('aws-sdk');

exports.handler = async function (event, context) {
  let connectionInfo;
  let connectionId = event.requestContext.connectionId;

  const callbackAPI = new AWS.ApiGatewayManagementApi({
    apiVersion: '2018-11-29',
    endpoint:
      event.requestContext.domainName + '/' + event.requestContext.stage,
  });

  try {
    connectionInfo = await callbackAPI
      .getConnection({ ConnectionId: event.requestContext.connectionId })
      .promise();
  } catch (err) {
    console.log(err);
  }

  connectionInfo.connectionID = connectionId;

  await callbackAPI
    .postToConnection({
      ConnectionId: event.requestContext.connectionId,
      Data: JSON.stringify(connectionInfo),
    })
    .promise();

  return {
    statusCode: 200,
  };
};