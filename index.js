const core = require('@actions/core')
const aws = require('aws-sdk')
const fs = require('fs').promises

const outputPath = core.getInput('OUTPUT_PATH') || process.env.OUTPUT_PATH
const outputFileType = core.getInput('OUTPUT_FILE_TYPE') || process.env.OUTPUT_FILE_TYPE

const AWSConfig = {
  accessKeyId: core.getInput('AWS_ACCESS_KEY_ID') || process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: core.getInput('AWS_SECRET_ACCESS_KEY') || process.env.AWS_SECRET_ACCESS_KEY,
  region: core.getInput('AWS_DEFAULT_REGION') || process.env.AWS_DEFAULT_REGION
}

if (core.getInput('AWS_SESSION_TOKEN') || process.env.AWS_SESSION_TOKEN) {
  AWSConfig.sessionToken = core.getInput('AWS_SESSION_TOKEN') || process.env.AWS_SESSION_TOKEN
}

async function getSecretValue (secretsManager, secretName) {
  try {
    if (!secretsManager) {
      secretsManager = new aws.SecretsManager(AWSConfig)
    }

    if (!secretName) {
      secretName = core.getInput('SECRET_NAME')
    }

    const resp = await secretsManager.getSecretValue({ SecretId: secretName }).promise()
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
        core.info(`Export File ${outputPath}`)
        if (outputFileType && outputFileType.toLowerCase() === 'json') {
          await fs.writeFile(outputPath, secretString)
        } else {
          const secretsAsEnv = Object.entries(parsedSecret).map(([key, value]) => `${key}=${value}`).join('\n')
          await fs.writeFile(outputPath, secretsAsEnv)
        }
      }
    } catch (e) {
      core.warning('Parsing asm secret is failed. Secret will be store in asm_secret')
      core.exportVariable('asm_secret', secretString)
      if (outputPath) {
        await fs.writeFile(outputPath, secretString)
      }
    }
  } catch (err) {
    core.setFailed(err)
  }
}

exports.getSecretValue = getSecretValue
