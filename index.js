const core = require('@actions/core')
const aws = require('aws-sdk')

const secretName = core.getInput('SECRET_NAME')
const secretsManager = new aws.SecretsManager({
  accessKeyId: core.getInput('AWS_ACCESS_KEY_ID'),
  secretAccessKey: core.getInput('AWS_SECRET_ACCESS_KEY'),
  region: core.getInput('AWS_DEFAULT_REGION')
})

async function getSecretValue (secretName) {
  return secretsManager.getSecretValue({ SecretId: secretName }).promise()
}

getSecretValue(secretName).then(resp => {
  core.setSecret(resp.SecretString)
  const secret = resp.SecretString

  if (secret) {
    const parsedSecret = JSON.parse(secret)
    Object.entries(parsedSecret).forEach(([key, value]) => {
      core.exportVariable(key, value)
    })
  } else {
    core.warning(`${secretName} has no secret values`)
  }
}).catch(err => {
  core.setFailed(err)
})
