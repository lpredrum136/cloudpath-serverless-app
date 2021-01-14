cp "hexl-serverless-lambda/hexalSlsAppTut$1.js" index.js
"C:\Program Files\WinRAR\WinRAR.exe" a lambdaoutput.zip index.js
aws s3 mv lambdaoutput.zip s3://serverless-app-tut-hexal
aws lambda update-function-code --function-name hexalSlsAppTut$1 --region ap-southeast-2 --s3-bucket serverless-app-tut-hexal --s3-key lambdaoutput.zip
rm index.js