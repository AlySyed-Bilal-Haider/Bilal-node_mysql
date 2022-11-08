import express from "express";
import routes from "./Routes/routes.js";
import cors from "cors";
const app = express();
const PORT = 8080;
app.use(cors("*"));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use("/", routes);
app.listen(PORT, (req, res) => {
  console.log("Server run successfully");
});
