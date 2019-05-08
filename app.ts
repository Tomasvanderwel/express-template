import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { json, urlencoded } from 'body-parser';
import { config } from 'dotenv';

config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// Handlers
app.use((req, res, next) => {
    let err = { ...new Error('Not Found'), status: 404 };
    return next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.send(err.message);
});

// Server
const server = app.listen(port, () => {
    return console.log(`Server listening on port: ${port}`);
});

export { app, server };