const express = require("express");
const { connect } = require("./config/db.config");
const app = express();
const port = 3000;
const notesRoute = require("./routes/notes");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

connect();
// routes
app.use('/notes',notesRoute)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
