import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { ENV } from "./src/lib/env.js";

const PORT = ENV.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running @ http://localhost:${PORT} `));
connectDB();
