var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
require('dotenv').config();

// Serve the cv.pdf file as a download
router.get('/download', async (req, res) => {
	// Dummy wait to simulate a slow download for testing
	if (process.env.NODE_ENV === 'development') {
		await new Promise(resolve => setTimeout(resolve, 2000));
	}
	const filePath = path.join(__dirname, '..', 'public', 'cv', 'cv.pdf');
	try {
		fs.accessSync(filePath, fs.constants.R_OK);
	}	catch (err) {
		console.error(err);
		res.status(404).send('File not found');
		return;
	}
	const file = fs.createReadStream(filePath);
	res.setHeader('Content-Disposition', 'attachment; filename=jules-ferguson-cv.pdf');
	res.setHeader('Content-Type', 'application/pdf');
	file.pipe(res);
});

// Serve the "rendered" CV - that is the CV in HTML rather than in PDF
router.get('/rendered', async (req, res) => {
	const htmlPath = path.join(__dirname, '..', 'public', 'cv', 'cv.html');

	// Try to send the file if it exists
	try {
		fs.accessSync(htmlPath, fs.constants.R_OK);
	} catch (err) {
		// TODO: Try to find the unconverted file and turn into HTML file
		console.error(err);
		res.status(404).send('File not found');
		return;
	}	
	const file = fs.createReadStream(htmlPath);
	res.setHeader('Content-Type', 'text/html');
	file.pipe(res);
});

module.exports = router;
