import { createConnection } from "mysql";
export var connection = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});
