import express, { Request, Response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';

const app = express();
const port = 3000;
const APP_NAME = 'TryHTTP';

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

app.get('/pages/new', (request: Request, response: Response) => {
  response.render('new', { APP_NAME });
});

app.post('/pages/create', (request: Request, response: Response) => {
  const title: string = request.body.title;
  const content: string = request.body.content;
  response.redirect(`/pages/echo?title=${title}&content=${content}`);
});

app.get('/pages/echo', (request: Request, response: Response) => {
  const { title, content } = request.query;
  response.render('echo', { APP_NAME, title, content });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
