const mongoose = require("mongoose");
const app = require("./app");
// const { DB_HOST, PORT = 6000 } = process.env;

DB_HOST =
  "mongodb+srv://Taras:6eHR66NE5mwcHeH0@cluster0.dvayzso.mongodb.net/db-contacts?retryWrites=true&w=majority";
mongoose.set("strictQuery", true);
PORT = 6000;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
    console.log("Database connect successfull");
  })
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });
