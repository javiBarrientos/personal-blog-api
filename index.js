import express from 'express';
import articles from './controllers/articles.js';
import './loadEnvironment.js';

const app = express();

app.use(express.json());

app.use('/', articles);

app.listen(3000);