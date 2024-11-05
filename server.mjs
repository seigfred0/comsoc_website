import express from 'express';
import path from 'path';

import attendanceRoutes from './server/routes/attendanceRoutes.mjs'
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve('client')));



// Routes
app.use('/attendance', attendanceRoutes);


app.get('/*', (req, res) => {
    console.log('hit')
    res.sendFile(path.resolve('client', 'index.html'))
})
 
app.listen(5000, () => {
    console.log('Server RUNNING')
})