import express, { Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

const app = express();
const port = 3000;
const APP_NAME = '山羊郵便';

// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set the view engine to ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set the favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// Define a route
app.get('/', (request: Request, response: Response) => {
  response.render('index', { APP_NAME });
});

app.get('/letters/new', (request: Request, response: Response) => {
  const page_title: string = '手紙を出す';
  response.render('new', { APP_NAME, page_title });
});

app.post('/letters/create', (request: Request, response: Response) => {
  const title: string = request.body.title;
  const content: string = request.body.content;
  response.redirect(`/letters/echo?title=${title}&content=${content}`);
});

app.get('/letters/echo', (request: Request, response: Response) => {
  const { title, content } = request.query;
  const page_title: string = '手紙を送りました';
  response.render('echo', { APP_NAME, page_title, title, content });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
