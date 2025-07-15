const { Client } = require('pg');
const faker = require('faker');

const client = new Client({
  connectionString: 'postgres://user:password@localhost:5432/soclose'
});

async function insertFakeData() {
  await client.connect();

  for (let i = 0; i < 50; i++) {
    const name = faker.company.companyName();
    const district = faker.address.city();

    await client.query('INSERT INTO gardens (name, district) VALUES ($1, $2)', [name, district]);
  }

  await client.end();
}

insertFakeData().then(() => console.log('Données insérées !'));
