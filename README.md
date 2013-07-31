# Node Mirror

Copy compiled versions of Node.js from nodejs.org to S3.

**Note: This was a proof-of-concept app. We're currently using
[s3pository](https://github.com/heroku/s3pository) instead.**

## How it works

1. Parse Nodejs.org's [list of versions](http://nodejs.org/dist/npm-versions.txt)
2. Find all versions already copied to S3.
3. Diff the two lists and copy any new versions (above 0.8.6) from nodejs.org to S3.

## Example URLs

- http://nodejs.org/dist/v0.10.13/node-v0.10.13-linux-x64.tar.gz
- http://heroku-node-mirror.s3.amazonaws.com/node-v0.10.13-linux-x64.tar.gz