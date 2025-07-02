mport { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(__dirname, '../data/data.json');

const getGardens = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const { district } = req.query;

  if (district) {
    const filtered = data.filter((g: any) =>
      g.district.toLowerCase() === String(district).toLowerCase()
    );
    return res.json(filtered);
  }

  res.json(data);
};


const getGardenById = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const garden = data.find((g: any) => g.id === parseInt(req.params.id));
  garden ? res.json(garden) : res.status(404).send('Not found');
};

const createGarden = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const newGarden = { ...req.body, id: Date.now() };
  data.push(newGarden);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.status(201).json(newGarden);
};

const updateGarden = (req: Request, res: Response) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const index = data.findIndex((g: any) => g.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Not found');
  data[index] = { ...data[index], ...req.body };
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(data[index]);
};


const deleteGarden = (req: Request, res: Response) => {
  let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const index = data.findIndex((g: any) => g.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send('Not found');
  const removed = data.splice(index, 1);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  res.json(removed[0]);
};

export { getGardens, getGardenById, createGarden, updateGarden, deleteGarden };