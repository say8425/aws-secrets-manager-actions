# AWS Secrets Manager Actions

[![npm version](https://img.shields.io/npm/v/aws-secrets-manager-actions?color=cb3837&logo=npm)](https://www.npmjs.com/package/aws-secrets-manager-actions)
[![GitHub Actions Test](https://github.com/say8425/aws-secrets-manager-actions/workflows/Test/badge.svg)](https://github.com/say8425/aws-secrets-manager-actions/actions?query=workflow%3ATest)
[![GitHub Actions Publish](https://github.com/say8425/aws-secrets-manager-actions/workflows/Publish/badge.svg)](https://github.com/say8425/aws-secrets-manager-actions/actions?query=workflow%3APublish)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/say8425/aws-secrets-manager-actions/blob/master/LICENSE)

This GitHub Action lets you export secrets stored in [AWS Secrets Manager](https://aws.amazon.com/secrets-manager) to environment values in your GitHub runner.

## Usage

Add the AWS IAM keys and the secret name that you want to use from your AWS Secrets Manager secrets list to your GitHub repo secrets. Then, in the GitHub actions yaml, add the following step.

```yaml
steps:
 - name: Export ENV from AWS SecretManager
   uses: say8425/aws-secrets-manager-actions@v2
   with:
     AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
     AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
     AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
     SECRET_NAME: ${{ secrets.SECRET_NAME }}
     OUTPUT_PATH: '.env' # optional
```

### AWS IAM

You need an [AWS IAM](https://aws.amazon.com/iam) user that has policies to access/read the AWS Secrets Manager secret. Add this IAM user's access id/keys as `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and region as `AWS_DEFAULT_REGION` in your repo's [GitHub Secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets).

#### Policy

An example policy to provide the permissions to the user is given below:

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

We recommend being more specific with the `Resource` in the policy by adding the secret ARN.

Get more information at [AWS User Guide](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_identity-based-policies.html#permissions_grant-get-secret-value-to-one-secret).

### Secret Name

This is the secret name that you want to read the secrets from. Only one secret name is supported.

### Environment Values

Your secrets will be exported as environment values into the github runner.
These environment values are masked with `***` in logs in the GitHub Actions for security purposes.

#### Raw string values

Most of the secrets can be parsed. However, in some case, parsing of secrets can fail. An example case is an invalid json.
In such cases, the unparsed raw sting is stored in `asm_secret` env key.  

### Export environment variables to file

The environment variables can also be exported to a file with `OUTPUT_PATH` input parameter.
When `OUTPUT_PATH` is defined, the GitHub action writes the environment variables to the specified filename.

## Contributing

Your contributions are always welcome!
Feel free to check [issues](https://github.com/say8425/aws-secrets-manager-action/issues)
or [Pull Requests](https://github.com/say8425/aws-secrets-manager-actions/pulls)

## License

This project is [MIT](https://github.com/say8425/aws-secrets-manager-action/blob/master/LICENSE) licensed.
