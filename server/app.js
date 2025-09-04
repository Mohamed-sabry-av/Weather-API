const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const corsMiddleware = require("./middlewares/cors.middleware");

app.use(express.json());
app.use(corsMiddleware);

// routes
app.use("/weather", require("./routes/weather.route"));

app.listen(process.env.PORT, () =>
  console.log(`server started at port ${process.env.PORT}`)
);
