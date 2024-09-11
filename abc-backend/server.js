// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes')
const bookingRoutes = require('./routes/bookingRoutes');
const roomRoutes = require('./routes/roomRoutes');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use('/api/user/', userRoutes);
app.use('/api/auth/', authRoutes);
app.use('/api/room/', bookingRoutes);
app.use('/api/rooms/', roomRoutes);

const PORT = process.env.PORT || 5003;

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Database connection error:', err));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
