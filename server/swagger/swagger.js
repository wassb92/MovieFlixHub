const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger/output.json";
const endpointsFiles = ["./routes/auth.js", "./routes/private.js"];

swaggerAutogen(outputFile, endpointsFiles);
