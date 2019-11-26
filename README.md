# AWS Secrets Manager Actions

[![npm version](https://img.shields.io/npm/v/aws-secrets-manager-actions?color=cb3837&logo=npm)](https://www.npmjs.com/package/aws-secrets-manager-actions)
[![GitHub Actions Test](https://github.com/say8425/aws-secrets-manager-actions/workflows/Test/badge.svg)](https://github.com/say8425/aws-secrets-manager-actions/actions?query=workflow%3ATest)
[![GitHub Actions Publish](https://github.com/say8425/aws-secrets-manager-actions/workflows/Publish/badge.svg)](https://github.com/say8425/aws-secrets-manager-actions/actions?query=workflow%3APublish)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/say8425/aws-secrets-manager-actions/blob/master/LICENSE)

This GitHub Action helps you use your Environment values from [AWS Secrets Manager](https://aws.amazon.com/secrets-manager).

## Usage

```yaml
steps:
 - name: Store ENV from AWS SecretManager
   uses: say8425/aws-secrets-manager-actions@v0.10.0
   with:
     AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
     AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
     AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
     SECRET_NAME: ${{ secrets.SECRET_NAME }}
```

### AWS IAM

You need [AWS IAM](https://aws.amazon.com/iam) user that has proper policy to access AWS Secrets Manager. Add this IAM user keys at `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` and region `AWS_DEFAULT_REGION`. But we greatly recommend to store the keys at [GitHub Secrets](https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-and-using-encrypted-secrets) and use it.

#### Policy

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

If you need policy example, then feel free to use above policy. And you can get more information at [AWS User Guide](https://docs.aws.amazon.com/secretsmanager/latest/userguide/auth-and-access_identity-based-policies.html#permissions_grant-get-secret-value-to-one-secret).


### Secret Name

Add you want to get secret name from secrets list.

### Environments

Then you can use your all secrects stored from AWS Secrets Manager through Environment values. And these environment values are masked with `***`. so never can be revealed.

## Contributing

AWS Secrets Manager Actions did not have any test yet. And code needs to be refactored.
So your Contributions are welcome! Feel free to check [issues page](https://github.com/say8425/aws-secrets-manager-action/issues).

## License

This project is [MIT](https://github.com/say8425/aws-secrets-manager-action/blob/master/LICENSE) licensed.
