'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-2' })

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-southeast-2'
  })

  let body = ''
  let statusCode = 0

  // const { id } = event.pathParameters
  const { id, productname } = JSON.parse(event.body)

  const params = {
    TableName: 'Products',
    Key: {
      id
    },
    UpdateExpression: 'set productname = :n',
    ExpressionAttributeValues: {
      ':n': productname
    },
    ReturnValues: 'UPDATED_NEW'
  }

  try {
    const data = await documentClient.update(params).promise()
    body = JSON.stringify(data)
    statusCode = 204
  } catch (error) {
    body = `Unable to update product: ${error}`
    statusCode = 403
  }

  const response = {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'access-control-allow-origin': '*'
    },
    body
  }

  return response
}
