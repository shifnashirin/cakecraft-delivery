const express = require('express');
const cors = require('cors');
const middleware = require('./src/middleware');

const AuthRoutes = require('./src/routes/auth');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!, This is a CakeDelight web');
}
);
// app.use('/test', test)

app.use('/api', AuthRoutes);

//app.use('/api/admin',middleware.decodeToken, middleware.checkRole('admin'),  AdminuserRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
