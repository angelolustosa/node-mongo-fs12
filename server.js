import { Usuario } from "./src/models/Usuario.js";
import app from "./src/app.js";
import './src/db/dbConnect.js'

const HOST = "localhost";
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Example app listening on port http://${HOST}:${PORT}`);
});
