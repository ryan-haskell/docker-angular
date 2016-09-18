var express = require('express');
var app = express();

// Serves static files
app.use('/static', express.static(__dirname + '/dist/'));
app.use('/node_modules', express.static(__dirname + '/node_modules/'));

//  Send all other requests to the webapp.
app.use(function(req, res){
    res.status(200).sendFile(__dirname+'/dist/index.html');
});

//  Start the server
if (module === require.main) {
    var server = app.listen(process.env.PORT || 8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('');
    console.log('------------------------------------------------');
    console.log('Angular Started:');
    console.log('Ready on port %s', port);
    console.log('------------------------------------------------');
    console.log('');
  });
}

module.exports = app;
