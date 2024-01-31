const { Client } = require('pg');

(async () => {
    const client = new Client({
        user: "postgres",
        password: "testpassword",
        host: "postgres",
        database: "template1",
        port: 5432
    });

    await client.connect();
    try {
        console.log("connected.");

        const query = {
            text: "SELECT $1 || $2 as hello",
            values: [ "Hello,", "world!" ]
        };

        const res = await client.query(query);
        console.log(res.rows[0]);
    }
    catch (e) {
        console.log(e.stack);
    }
    finally {
        await client.end();
        console.log("disconnected.");
    }
})();
