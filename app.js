var _ = require("lodash");
var http = require("http");
var agent = require("superagent");
var semver = require("semver");
var knox = require("knox");

var s3 = knox.createClient({
  key: process.env.AWS_KEY,
  secret: process.env.AWS_SECRET,
  bucket: process.env.S3_BUCKET
});

function copyToS3(url) {
  console.log(url);

  http.get(url, function(res){
    var headers = {
      'Content-Length': res.headers['content-length'],
      'Content-Type': res.headers['content-type']
    };
    var filename = res.req.path.replace(/^.*[\\\/]/, '');
    console.log(filename);
    s3.putStream(res, "/"+filename, headers, function(err, res){
      if (err) console.error(err);
      console.log(res);
      console.log("logic");
    });
  });

}

agent.get("http://nodejs.org/dist/npm-versions.txt", function(res){

  var lines = res.text.split("\n");

  var urls = lines.map(function(line) {
    var match = line.match("v(.*) ")
    if (!match) return;
    var version = match[1];

    // 0.8.6 is the first available version on nodejs.org
    if (semver.lt(version, '0.8.6')) return;

    return "http://nodejs.org/dist/v" + version + "/node-v" + version + "-linux-x64.tar.gz";
  })

  urls = _.compact(urls);

  _.forEach(urls, copyToS3)

});
