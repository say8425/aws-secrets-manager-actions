import core from '@actions/core'
import AWS from 'aws-sdk'

const secretName = core.getInput('SECRET_NAME')
const secretsManager = new AWS.SecretsManager({
  accessKeyId: core.getInput('AWS_ACCESS_KEY_ID'),
  secretAccessKey: core.getInput('AWS_SECRET_ACCESS_KEY'),
  region: core.getInput('AWS_DEFAULT_REGION')
})

exports.handler = async (event, context) => {
  try {
    const data = await secretsManager.getSecretValue({
      SecretId: secretName
    }).promise()

    if (data) {
      if (data.SecretString) {
        core.setSecret(data.SecretString)
        const secret = data.SecretString
        const parsedSecret = JSON.parse(secret)

        Object.entries(parsedSecret).forEach(([key, value]) => {
          core.exportVariable(key, value)
        })
      } else {
        core.warning(`${secretName} has no secret values`)
      }
    }
  } catch (error) {
    core.setFailed(error)
  }
}
