const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./routes");
const app = express();
const port = process.env.PORT || 8080;;
app.use(bodyParser.json());
app.use("/", router);
require('dotenv').config();

// Подключение к MongoDB Atlas
async function connectToMongoDB() {
  await mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Соединение с MongoDB установлено'))
  .catch(err => console.error('Ошибка соединения с MongoDB:', err));
}
connectToMongoDB();

app.use(cors());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
