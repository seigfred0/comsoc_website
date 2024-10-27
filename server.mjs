import express from 'express';
import path from 'path';

import attendanceRoutes from './server/routes/attendanceRoutes.mjs'


const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.resolve('client')));


// Routes
app.use('/attendance', attendanceRoutes);


app.get('/*', (req, res) => {
    console.log('hit')
    res.sendFile(path.resolve('client', 'index.html'))
})
 
app.listen(4000, () => {
    console.log('Server RUNNING')
})