'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-2' })

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-southeast-2'
  })

  let body = ''
  let statusCode = 0

  const params = {
    TableName: 'Products'
  }

  try {
    console.log('Getting products with automatic deployment woohoo')
    const data = await documentClient.scan(params).promise()
    body = JSON.stringify(data.Items)
    statusCode = 200
  } catch (error) {
    body = `Unable to get products: ${error}`
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
