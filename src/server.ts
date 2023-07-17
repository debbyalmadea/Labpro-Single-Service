import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const PORT = process.env.PORT || 1234;

const whitelist = ['http://127.0.0.1:8000', 'http://localhost:5173', 'https://ohl-fe.vercel.app']
app.use(cors({
    origin: whitelist // Whitelist the monolith backend URL
  }));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

app.use(routes);