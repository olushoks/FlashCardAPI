const connectDB = require("./starter/database");
const express = require("express");
const app = express();
const cards = require("./routes/cards");

connectDB();

app.use(express.json());
app.use("api/cards", cards);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
