var express = require('express');
var router = express.Router();

var index = require('./admin/index.js');

var getFields = require('./admin/api/getFields.js');
var getModels = require('./admin/api/getModels.js');
var saveData = require('./admin/api/saveData.js');
var getDocuments = require('./admin/api/getDocuments.js');
var getDocumentToEdit = require('./admin/api/getDocumentToEdit.js');

router.get('/', index);

// TODO because of the follows urls dont have the slash at end
// it they seem lick each other, can happen that one be caller instead another
router.get('/api/getfields?:model', getFields);
router.get('/api/getmodels', getModels);
router.post('/api/savedata', saveData);
router.get('/api/getdocuments', getDocuments);
router.get('/api/getdocumenttoedit', getDocumentToEdit);

module.exports = router;
