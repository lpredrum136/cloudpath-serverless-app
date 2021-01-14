'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: 'ap-southeast-2' })

exports.handler = async (event, context) => {
  const documentClient = new AWS.DynamoDB.DocumentClient({
    region: 'ap-southeast-2'
  })

  let body = ''
  let statusCode = 0

  const { id, productname } = JSON.parse(event.body)

  const params = {
    TableName: 'Products',
    Item: {
      id,
      productname
    }
  }

  try {
    const data = await documentClient.put(params).promise()
    body = JSON.stringify(data)
    statusCode = 201
  } catch (error) {
    body = `Unable to put product you dumbass: ${error}`
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
