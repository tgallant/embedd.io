#!/usr/bin/env bash
LOCATION=embedd.io
DIR=build/
aws s3 sync $DIR s3://$LOCATION --region us-west-2
