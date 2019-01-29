const pg = require("pg");
const settings = require("./settings");
const name = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

const query = {
  text: "SELECT * FROM famous_people WHERE first_name = $1::text",
  values: [name],
  rowMode: 'array',
};

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query(query, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log(result.rows);
    client.end();
  });
});
