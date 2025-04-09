const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

module.exports = () => {
  mongoose
    .connect(process.env.DATABASE_URL)
    .then((data) => {
      console.log(`Database server connected at port: ${data.connection.port}`);
      console.log(`Database server connected at host: ${data.connection.host}`);
    })
    .catch((e) => console.log(e));
};
