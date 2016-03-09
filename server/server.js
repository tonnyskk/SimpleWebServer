var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compression = require('compression'),
    fs = require('fs');

var app = express();
// Enable compression (gzip) for Node server.
app.use(compression());
// urlencoded body parser is needed for parsing application/x-www-form-urlencodeds
app.use(bodyParser.urlencoded({extended: true}));
//json body parser is needed for POST
app.use(bodyParser.json());

var controllerFiles = fs.readdirSync(__dirname + '/controllers');
controllerFiles.forEach(function (controllerFile) {
    if (controllerFile.indexOf('.js') === -1) {
        return;
    } else {
        controllerFile = controllerFile.replace('.js', '');
        var fileName = './controllers/' + controllerFile;
        var controller = new (require(fileName))();
        controller.setup(app);
    }
});

var server = app.listen(8080, function(){
    var port = server.address().port;
    console.log("Server started at port: %s", port);
});
