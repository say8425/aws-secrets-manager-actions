# AWS Secrets Manager Actions

[![npm version](https://img.shields.io/npm/v/aws-secrets-manager-actions.svg?style=flat)](https://github.com/say8425/aws-secrets-manager-action)
![GitHub Actions Test](https://github.com/say8425/aws-secrets-manager-action/workflows/Test/badge.svg)
![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)

This GitHub Action helps you use your Environment values that stored in AWS Secrets Manager.

## Usage

```yaml
steps:
 - name: Store ENV from AWS SecretManager
   uses: say8425/aws-secrets-manager-action@0.9.0
   with:
     AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
     AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
     AWS_DEFAULT_REGION: ${{ secrets.AWS_DEFAULT_REGION }}
     SECRET_NAME: ${{ secrets.SECRET_NAME }}
```

First of all, you need your AWS Access Key and Secret Access Key. You can create it at AWS IAM.
And we greatly recommend storing these keys in your GitHub Repository Secret.
Then your secrets will be stored at Environment Variables in your Actions.

## Contributing

AWS Secrets Manager Actions did not have any test yet. And code needs to be refactored.
So your Contributions are welcome! Feel free to check [issues page](https://github.com/say8425/aws-secrets-manager-action/issues).

## License

This project is [MIT](https://github.com/say8425/aws-secrets-manager-action/blob/master/LICENSE) licensed.
