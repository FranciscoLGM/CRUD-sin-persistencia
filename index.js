import express from "express";
import "dotenv/config";
import routes from "./routes.js";

const app = express();

// Puerto
const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());

// Usar el archivo routes.js como un middleware
app.use("/alumnos", routes);

//Arrancar el server
app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`);
});
