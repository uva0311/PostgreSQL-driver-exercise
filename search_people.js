// Basic config
const settings = {
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'development',
    password : 'development',
    database : 'test_db'
  }
};

const knex = require('knex')(settings);

const name = process.argv[2];

let query = knex.select("*").from('famous_people').where('first_name', '=', name);

query.then((rows) => {
        for (row of rows) {
            console.log(`${row['id']} ${row['first_name']} ${row['last_name']} ${row['birthdate']}`);
        }
     }).catch((err) => { console.log( err); throw err })
     .finally(() => {
         knex.destroy();
     });
