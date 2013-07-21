var request = require("superagent");
var _ = require("lodash");

var client = knox.createClient({
  key: '<api-key-here>',
  secret: '<secret-here>',
  bucket: 'learnboost'
});

http.get("http://nodejs.org/dist/npm-versions.txt", function(res){

  var lines = res.text.split("\n");

  var urls = lines.map(function(line) {
    var nodeVersion = line.match("(v.*) ")
    if (!nodeVersion) return;
    return "http://nodejs.org/dist/" + nodeVersion[1] + "/node-" + nodeVersion[1] + "-linux-x64.tar.gz";
  })

  urls = _.compact(urls);

  console.log(urls);

  http.get('http://google.com/doodle.png', function(res){
    var headers = {
        'Content-Length': res.headers['content-length']
      , 'Content-Type': res.headers['content-type']
    };
    client.putStream(res, '/doodle.png', headers, function(err, res){
      // Logic
    });
  });


});
