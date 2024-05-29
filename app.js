const express = require('express');
const app = express();
const userRoutes = require('./routes/user_route');
const eventRoutes = require('./routes/event_route');
const paymentRoutes = require('./routes/payment_route');
const cors = require('cors');

app.use(express.json()); // Parse JSON request bodies
app.use(cors({ origin: ['http://localhost:3000', 'http://172.16.35.39:3000'] }));
 
app.use('/public', express.static(__dirname + "/public"))
// Mount user routes
app.use('/api/user', userRoutes);
app.use('/api/event', eventRoutes);
app.use('/api/payment', paymentRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
