import { Bucket } from '@aws-cdk/aws-s3';
import { App, CfnOutput, Stack } from '@aws-cdk/core';
import { BucketDeployment, Source } from '../lib';

const app = new App();
const stack = new Stack(app, 'TestBucketDeploymentContent');
const bucket = new Bucket(stack, 'Bucket');

const file1 = Source.content('file1.txt', 'boom');
const file2 = Source.content('path/to/file2.txt', `bam! ${bucket.bucketName}`);

new BucketDeployment(stack, 'DeployMe', {
  destinationBucket: bucket,
  sources: [file1, file2],
  destinationKeyPrefix: 'deploy/here/',
});

new CfnOutput(stack, 'BucketName', { value: bucket.bucketName });

app.synth();