const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const pgp = require('pg-promise')();

const app = express();
app.use(cors());
app.use(express.json());

const uploadsDir = path.join(__dirname, '../client/public/uploads');
fs.mkdirSync(uploadsDir, { recursive: true });
app.use('/uploads', express.static(uploadsDir));

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'blog_hikes',
  user: 'shirelmr',
  password: '',
  allowExitOnIdle: true
};
const db = pgp(cn);

async function syncSequences() {
  // If IDs were inserted manually in the past, sequences can lag and cause duplicate-key errors.
  await db.one("SELECT setval('author_id_author_seq', COALESCE((SELECT MAX(id_author) FROM author), 0), true)");
  await db.one("SELECT setval('post_id_post_seq', COALESCE((SELECT MAX(id_post) FROM post), 0), true)");
}

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

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({storage: storage});

app.post('/posts/new', upload.single('img'), async function(req, res){
  const title = req.body.title?.trim();
  const text = req.body.text?.trim();
  const authorRaw = req.body.author?.trim();

  if (!title || !text || !authorRaw || !req.file) {
    return res.status(400).json({ message: 'Faltan datos del post (titulo, autor, texto o imagen).' });
  }

  const [authorName, ...authorLastNameParts] = authorRaw.split(/\s+/);
  const authorLastName = authorLastNameParts.join(' ') || 'SinApellido';

  try {
    const createdPost = await db.tx(async (t) => {
      let author = await t.oneOrNone(
        'SELECT id_author FROM author WHERE LOWER(name) = LOWER($1) AND LOWER(lastname) = LOWER($2)',
        [authorName, authorLastName]
      );

      if (!author) {
        author = await t.one(
          'INSERT INTO author (name, lastname) VALUES ($1, $2) RETURNING id_author',
          [authorName, authorLastName]
        );
      }

      return t.one(
        'INSERT INTO post (title, "text", image, "date", id_author) VALUES ($1, $2, $3, NOW(), $4) RETURNING id_post',
        [title, text, `/uploads/${req.file.filename}`, author.id_author]
      );
    });

    res.status(201).json({ message:'Post agregado correctamente', id_post: createdPost.id_post });
  } catch (error) {
    console.log('ERROR:', error);
    res.status(500).json({ message: 'No se pudo crear el post.', code: error.code || 'UNKNOWN' });
  }
});

syncSequences()
  .then(() => {
    app.listen(8000, () => {
      console.log('Servidor corriendose en el puerto 8000');
    });
  })
  .catch((error) => {
    console.log('ERROR iniciando servidor:', error);
  });