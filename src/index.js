import A from "./A.js";
import { connectDB } from "./db.js";

connectDB();
A.listen(3000);
console.log('Servidor corriendo', 3000);