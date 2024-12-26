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

// Serve the cv.pdf file to be viewed in the browser in an iframe
// This is used in the contact page
router.get('/view', async (req, res) => {
	const filePath = path.join(__dirname, '..', 'public', 'cv', 'cv.pdf');
	try {
		fs.accessSync(filePath, fs.constants.R_OK);
	}	catch (err) {
		console.error(err);
		res.status(404).send('File not found');
		return;
	}
	const file = fs.createReadStream(filePath);
	res.setHeader('Content-Type', 'application/pdf');
	file.pipe(res);
});

router.get('/rendered', async (req, res) => {
	const htmlPath = path.join(__dirname, '..', 'public', 'cv', 'cv.html');

	// Ensure the file exists
	if (fs.existsSync(htmlPath)) {
		res.sendFile(htmlPath);
	} else {
		res.status(404).send('CV HTML file not found');
	}
});

module.exports = router;
