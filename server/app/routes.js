const express = require('express'),
      router = express.Router(),
      multer = require('multer');
      
module.exports = router;      
      
// We serve static assets when the root directory is requested
// keep in mind that the asset path (client) is relative to the entry file
router.use('/', express.static('client'));

var storage = multer.memoryStorage();
var upload = multer({storage : storage});

router.post('/upload', upload.single('data'), function(req, res) {
  // Endpoint logic will go here
  if (req.file) {
    res.status(200).json({
      filename: req.file.originalname,
      size: req.file.size,
      type: req.file.mimetype
    });
  } else {
    res.status(500).json({ error: `No file was provided in the 'data' field` });
  }
});