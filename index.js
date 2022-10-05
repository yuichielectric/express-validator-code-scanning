var app = require("express")();
var path = require("path");
const {check, validationResult} = require('express-validator');

app.get("/user-files/",
[check('file', 'file must be a string').isString()],
function(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).send('Invalid parameter');
  }
  var file = req.query.file;
  if (file.indexOf("..") !== -1) {
    // BAD
    // we forbid relative paths that contain ..
    // as these could leave the public directory
    res.status(400).send("Bad request");
  } else {
    var absolute = path.resolve("/public/" + file);
    console.log("Sending file: %s", absolute);
    res.sendFile(absolute);
  }
});

app.listen(3000, () => {
  console.log("Start on port 3000.")
});
