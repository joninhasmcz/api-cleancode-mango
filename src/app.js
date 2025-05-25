require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const empregadoRoutes = require('./routes/empregado');
const connectionMongoDB = require('./config/db');
const logger = require('./utils/logger');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV !== 'test') {
    connectionMongoDB();
}

app.use('/api/empregados', empregadoRoutes);

app.use((err, req, res) => {
    logger.error(err.stack);
    res.status(500).json({
        erro: 'Erro interno do servidor',
    })
})

module.exports = app;