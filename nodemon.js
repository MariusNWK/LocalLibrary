const express = require('express');
const router = express.Router();

// test nodemon
router.get('/test', (req, res) => {
  res.send('Nodemon functionnal');
});

module.exports = router;
