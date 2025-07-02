const express = require('express');
const cors = require('cors');
const gardensRouter = require('controllers/gardens');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/gardens', gardensRouter);

app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});