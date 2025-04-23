import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./db.js";
import { createAdminUser } from "./libs/seed.js";

connectDB().then(() => {
    createAdminUser();
    app.listen(4000, () => console.log("Server on port 4000"));
});
