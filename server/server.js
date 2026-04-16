const express = require('express');
const cors = require('cors');
const pgp = require('pg-promise')();

const app = express();
app.use(cors());
app.use(express.json());

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'blog_hikes',
  user: 'shirelmr',
  password: '',
  allowExitOnIdle: true
};
const db = pgp(cn);

/* GET hello */
app.get('/hello', (req, res) => {
  res.json({ message: 'Hola' });
});

/* GET all the posts */
app.get('/posts', (req, res) => {
  db.any(`
    SELECT post.*, author.name AS author_name, author.lastname AS author_lastname,
           CONCAT(author.name, ' ', author.lastname) AS author_full_name
    FROM post
    LEFT JOIN author ON post.id_author = author.id_author
  `)
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
});

/* GET a specific post */
app.get('/posts/:id_post', (req, res) => {
  db.one(`
    SELECT post.*, author.name AS author_name, author.lastname AS author_lastname,
           CONCAT(author.name, ' ', author.lastname) AS author_full_name
    FROM post
    LEFT JOIN author ON post.id_author = author.id_author
    WHERE post.id_post=$1
  `, [req.params.id_post])
    .then((data) => res.json(data))
    .catch((error) => console.log('ERROR:', error));
});

app.listen(8000, () => {
  console.log('Servidor corriéndose en el puerto 8000');
});