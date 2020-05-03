// // import { getSecretValue } from './index.js'
//
// const index = require('./index.js')
//
// describe("Index File", () => {
//   test("it should has ENV File", async () => {
//     const INPUT_SECRET_NAME = 'pongdang-env-test'
//     process.env.INPUT_AWS_ACCESS_KEY_ID = 'AKIAXIPQLXCNPTH4UN6K'
//     process.env.INPUT_AWS_SECRET_ACCESS_KEY = '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'
//     process.env.INPUT_AWS_DEFAULT_REGION = 'ap-northeast-1'
//
//     const data = await index.getSecretValue(INPUT_SECRET_NAME)
//     expect(data).toEqual('Mark')
//   })
// })

const aws = require('aws-sdk')
const index = require('./index.js')

describe('get SecretString from AWS SecretsManager', () => {
  let data = {}
  describe('get parsable data', () => {
    beforeAll(async () => {
      const INPUT_SECRET_NAME = process.env.SECRET_NAME
      const secretsManager = new aws.SecretsManager({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION
      })
      data = await index.getSecretValue(secretsManager, INPUT_SECRET_NAME)
    })

    test('should have SecretString', () => {
      expect(data).toHaveProperty('SecretString')
    })

    test('should have parsed values', () => {
      const parsedData = JSON.parse(data.SecretString)
      expect(parsedData.SCIENTIFIC_NAME).toEqual('Pygoscelis adeliae')
      expect(parsedData.MIN_HEIGHT).toEqual(46)
      expect(parsedData.MAX_HEIGHT).toEqual(71)
      expect(parsedData.MIN_WEIGHT).toEqual(3.6)
      expect(parsedData.MAX_WEIGHT).toEqual(6)
      expect(parsedData.SWIMMING_SPEED).toEqual(8)
      expect(parsedData.LEAPING_METERS).toEqual(3)
    })
  })

  describe('get unparsable data', () => {
    beforeAll(async () => {
      const INPUT_SECRET_NAME = `${process.env.SECRET_NAME}-unvalid`
      const secretsManager = new aws.SecretsManager({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION
      })
      data = await index.getSecretValue(secretsManager, INPUT_SECRET_NAME)
    })

    test('should have SecretString', () => {
      expect(data).toHaveProperty('SecretString')
    })
  })
})
