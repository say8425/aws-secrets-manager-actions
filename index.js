const core = require('@actions/core')
const aws = require('aws-sdk')
const fs = require('fs')

const outputPath = core.getInput('OUTPUT_PATH')
const secretName = core.getInput('SECRET_NAME')

const secretsManager = new aws.SecretsManager({
  accessKeyId: core.getInput('AWS_ACCESS_KEY_ID'),
  secretAccessKey: core.getInput('AWS_SECRET_ACCESS_KEY'),
  region: core.getInput('AWS_DEFAULT_REGION')
})

async function getSecretValue (secretsManager, secretName) {
  return secretsManager.getSecretValue({ SecretId: secretName }).promise()
}

getSecretValue(secretsManager, secretName).then(resp => {
  const secretString = resp.SecretString
  core.setSecret(secretString)

  if (secretString == null) {
    core.warning(`${secretName} has no secret values`)
    return
  }

  try {
    const parsedSecret = JSON.parse(secretString)
    Object.entries(parsedSecret).forEach(([key, value]) => {
      core.setSecret(value)
      core.exportVariable(key, value)
    })
    if (outputPath) {
      const secretsAsEnv = Object.entries(parsedSecret).map(([key, value]) => `${key}=${value}`).join('\n')
      fs.writeFileSync(outputPath, secretsAsEnv)
    }
  } catch (e) {
    core.warning('Parsing asm secret is failed. Secret will be store in asm_secret')
    core.exportVariable('asm_secret', secretString)
    if (outputPath) {
      fs.writeFileSync(outputPath, secretString)
    }
  }
}).catch(err => {
  core.setFailed(err)
})

exports.getSecretValue = getSecretValue
