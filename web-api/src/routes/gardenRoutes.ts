import express from 'express';
import {
  getGardens,
  getGardenById,
  createGarden,
  updateGarden,
  deleteGarden,
} from '../controllers/gardenController';

const router = express.Router();

router.get('/', getGardens);
router.get('/:id', getGardenById);
router.post('/', createGarden);
router.put('/:id', updateGarden);
router.delete('/:id', deleteGarden);

export default router;