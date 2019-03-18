var express = require('express');
var router = express.Router();
const watsonAssistant = require('../config/watsonConfig');

/* POST to Watson API */
router.post('/', function(req, res, next) {
  var { text, context } = req.body;
  context = JSON.parse(context);

  const params = {
    input: { text },
    workspace_id: '274902c6-a0be-465b-bba0-e5fac29d8c4c',
    context  
  };

  watsonAssistant.message(
      params,
      function(err, response) {
          if(err) {
              res.json({status:'ERRO', data:err});
          } else {
              res.json({status: 'OK', data:response});
          }
      }
  )
});

module.exports = router;
