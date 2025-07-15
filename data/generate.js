const { Client } = require('pg');
const faker = require('@faker-js/faker');

const client = new Client({
  connectionString: 'postgres://soclose_user:soclose_pass@localhost:5432/soclose'
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

insertFakeData().then();
