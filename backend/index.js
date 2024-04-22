import express from 'express';
import sequelize from './config.js';
import booksRoute from './routes/book.js';
import Book from './models/book.js';
import cors from 'cors';

const PORT = 5555;

const app = express();


app.use(express.json());
app.use(cors());


app.get('/',(req,res) => {
    return res.status(234).send('Welcome home');
});

app.use('/books',booksRoute);

sequelize
    .sync()
    .then(() => {
        app.listen(PORT);
        console.log('Database connected and server running!');
    })
    .catch(err => console.log(err));
