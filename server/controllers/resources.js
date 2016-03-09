var express = require('express'),
	path = require('path');

module.exports = function() {

	this.setup = function(app) {
		var webFolder = module.exports.getBaseFolder();

		app.use('/webapps', express.static(webFolder, { index: 'index.html'}));

		app.all(/^\/(.*)?$/, function(req, res) {
			var indexPage = path.join(webFolder, 'index.html');
			res.sendFile(indexPage);
		});
	};
};

module.exports.getBaseFolder = function() {
	return path.join(__dirname, '../../webapps');
};
