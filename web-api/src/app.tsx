import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import gardenRoutes from './routes/gardenRoutes';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/gardens', gardenRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});