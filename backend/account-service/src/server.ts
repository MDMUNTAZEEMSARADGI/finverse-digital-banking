import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT || 5003;

app.listen(PORT, () => {
  console.log(`Account Service running on ${PORT}`);
});
