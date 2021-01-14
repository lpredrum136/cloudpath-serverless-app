'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-2' })

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-southeast-2'
  })

  let body = ''
  let statusCode = 0

  const { id } = event.pathParameters

  const params = {
    TableName: 'Products',
    Key: {
      id
    }
  }

  try {
    const data = await documentClient.delete(params).promise()
    body = JSON.stringify(data)
    statusCode = 204
  } catch (error) {
    body = `Unable to delete product: ${error}`
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
