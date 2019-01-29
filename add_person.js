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

// Input data
const famousPerson = [{
  first_name: process.argv[2],
  last_name: process.argv[3],
  birthdate: process.argv[4]
}];


knex('famous_people').returning('id').insert(famousPerson)
     .then((rows) => {
        console.log("Famous person is added.")
     }).catch((err) => { console.log( err); throw err })
     .finally(() => {
         knex.destroy();
     });

