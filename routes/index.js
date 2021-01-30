const express = require('express');
const { getDetails, validateRule } = require('../controller');
const router = express.Router()

router.get("/", getDetails)
router.post("/validate-rule", validateRule)
module.exports = router;