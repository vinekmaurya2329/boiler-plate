const app = require("./app");
const sequelize = require("./config/database");


process.on("uncaughtException", (err) => {
  console.log(err);
  // process.exit(0);
});

// connectDatabase();
sequelize.authenticate().then(()=>{ 
 console.log('Db connected');
 sequelize.sync(); 
}).catch((error)=>{
  console.log('error while connection Db',error);
})

const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("app is listening on ", port);
});

process.on("unhandledRejection", (err) => {
  console.log(err);
  // server.close(() => process.exit(0));
});
