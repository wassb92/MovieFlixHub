require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/error");
const connectDB = require("./config/db");
const app = express();
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/output.json");
const bodyParser = require("body-parser");

connectDB();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// login and register with JWT (no api)
app.use("/api", require("./routes/auth"));
app.use("/api", require("./routes/private"));

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(errorHandler);

module.exports = app;
