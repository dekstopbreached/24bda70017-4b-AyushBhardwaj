/**
 * Server entry: Express app, middleware, base route, cards router.
 */

const express = require('express');
const cors = require('cors');
const cardRoutes = require('./routes/card.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Card collection API', docs: 'GET /cards, GET /cards/:id, POST /cards, PUT /cards/:id, DELETE /cards/:id' });
});

app.use('/cards', cardRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
