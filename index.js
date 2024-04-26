require('dotenv').config()

const express = require("express");
const cors = require('cors');

const connectDB = require("./config/dbConfig")

const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes')

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();

//databse config
connectDB();

const PORT = 8005 || process.env.PORT

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', userRoutes)
app.use('/api/v1/task', todoRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument
  , {
    swaggerOptions: {
      validatorUrl: null, // Disable schema validation
      docExpansion: 'list', // Expand all operations by default
      defaultModelsExpandDepth: -1 // Disable model expansion
    },
    customCss: '.swagger-ui .topbar { display: none }', // Hide the top bar
  }
));


app.get("/", (req, res) => {
    res.send("Hello Amit");
})

app.listen(PORT, ()=>{
    console.log(`Port  is running ON ${PORT}`);
})