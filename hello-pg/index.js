const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    password: "testpassword",
    host: "postgres",
    database: "template1",
    port: 5432
});

client.connect();

const query = {
    text: "SELECT $1 || $2 as hello",
    values: [ "Hello,", "world!" ]
};

(async () => {
    try {
        const res = await client.query(query);
        console.log(res.rows[0]);
    }
    catch (e) {
        console.log(e.stack);
    }
    finally {
        client.end();
    }
})();
