const app = require("./app");
const connectDatabase = require("./config/database");

process.on("uncaughtException", (err) => {
  console.log(err);
  // process.exit(0);
});

connectDatabase();

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("app is listening on ", port);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  // server.close(() => process.exit(0));
});
