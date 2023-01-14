# AWS Secrets Manager Actions

[![NPM version](https://img.shields.io/npm/v/aws-secrets-manager-actions?color=cb3837&logo=npm)](https://www.npmjs.com/package/aws-secrets-manager-actions)
[![AWS Secrets Manager](https://img.shields.io/badge/AWS-Secrets_Manager-FF9900?logo=Amazon+AWS&logoColor=FF9900)](https://aws.amazon.com/secrets-manager)
[![GitHub Actions Test](https://github.com/say8425/aws-secrets-manager-actions/workflows/Test/badge.svg)](https://github.com/say8425/aws-secrets-manager-actions/actions?query=workflow%3ATest)
[![GitHub Actions Release](https://github.com/say8425/aws-secrets-manager-actions/workflows/Release/badge.svg)](https://github.com/say8425/aws-secrets-manager-actions/actions?query=workflow%3ARelease)
[![MIT license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/say8425/aws-secrets-manager-actions/blob/master/LICENSE)

This GitHub Action lets you export secrets stored in [AWS Secrets Manager](https://aws.amazon.com/secrets-manager) to environment values in your GitHub runner.

## Usage

Add the AWS IAM keys and the secret name that you want to use AWS Secrets Manager secrets from GitHub Action. There are two ways to use this action.

1. GitHub [OpenID Connect](https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/configuring-openid-connect-in-amazon-web-services) (Recommended)

```yaml
steps:
  - name: Configure AWS credentials
    uses: aws-actions/configure-aws-credentials@v1-node16
    with:
      role-to-assume: arn:aws:iam::1234567890:role/my-secret
      aws-region: "YOUR-AWS-REGION"

  - name: Export ENV from AWS SecretManager
    uses: say8425/aws-secrets-manager-actions@v3
    with:
      AWS_DEFAULT_REGION: "YOUR-AWS-REGION"
      SECRET_NAME: "YOUR-SECRET_NAME"
      OUTPUT_PATH: ".env" # optional
```

2. GitHub [Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)

```yaml
steps:
  - name: Export ENV from AWS SecretManager
    uses: say8425/aws-secrets-manager-actions@v3
    with:
      AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
      AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
      AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
      SECRET_NAME: ${{ secrets.SECRET_NAME }}
      OUTPUT_PATH: ".env" # optional
```

### Credentials

You need an [AWS IAM](https://aws.amazon.com/iam) user that has policies to access/read the AWS Secrets Manager secret.

#### Policy

An example policy to provide the permissions to the user is given below. The example has the full access to the AWS Secrets Manager resources.
But we recommend to [grant least privilege](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege) to the credentials used in GitHub Actions workflows.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": "secretsmanager:GetSecretValue",
      "Resource": "*"
    }
  ]
}
```

Get more information at [AWS User Guide](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_identity-based-policies.html#permissions_grant-get-secret-value-to-one-secret).

### Secret Name

The secret name is list of secrets that you want to export to environment values. Multiple secrets not supported yet.

### Environment Values

Your secrets will be exported as environment values into the github runner.
These environment values will be masked with `***` in the logs.

### Invalid Secret

![Invalid Secret Key Value](docs/invalid%20secret%20key%20value.png)
![Invalid Secret Plaintext](docs/invalid%20secret%20plaintext.png)

Invalid secret key value or plaintext will not be exported as environment values.
Instead, it will be stored in `INVALID_ASM_SECRET` env key.

### Export environment variables to file

The environment variables can also be exported to a file with `OUTPUT_PATH` input parameter.
When `OUTPUT_PATH` is defined, the GitHub action writes the environment variables to the specified filename.

## Contributing

Your contributions are always welcome!
Feel free to check [issues](https://github.com/say8425/aws-secrets-manager-action/issues)
or [Pull Requests](https://github.com/say8425/aws-secrets-manager-actions/pulls)

## License

This project is [MIT](https://github.com/say8425/aws-secrets-manager-action/blob/master/LICENSE) licensed.
