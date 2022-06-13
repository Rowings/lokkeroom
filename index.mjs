import pkg from "pg";
const { Pool, Client } = pkg;

import { users } from "./users.mjs";

const client = new Client({
  host: "127.0.0.1",
  user: "superadmin",
  port: 5432,
  password: "yoyo",
  database: "lokkeroom",
});

const text = `
CREATE TABLE IF NOT EXISTS users (
    id SERIAL,
    userName varchar,
    mdp varchar,
    email varchar,
    date_creation varchar,
    ip varchar
);
`;

const execute = async (query) => {
  try {
    await client.connect(); // gets connection
    await client.query(query); // sends queries
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  } finally {
    await davai();
    await client.end(); // closes connection
  }
};

execute(text).then((result) => {
  if (result) {
    console.log("Table created");
  }
});

async function davai() {
  for (const user of users) {
    let id = user.id;
    let userName = user.userName;
    let mdp = user.motDePasse;
    let mail = user.email;
    let date = user.dateCrea;
    let ip = user.ip;

    try {
      await client.query(
        `INSERT INTO users (id, username, mdp, email, date_creation, ip) 
        VALUES ($1, $2, $3, $4, $5);`,
        [id, userName, mdp, mail, date, ip]
      );
    } catch (err) {
      console.log(err);
    }
  }
}
