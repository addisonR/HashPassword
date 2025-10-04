import express from "express";
import dotevn from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import hashContraseña from "./helpers/hashContraseña.js";

dotevn.config();
const app = express();
const port = process.env.SERVER_PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("index");
});
app.use("/api/hash", hashContraseña);

app.listen(port, () => console.log("server running"));
