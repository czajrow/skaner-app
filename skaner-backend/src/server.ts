import express = require("express");
import { PROBE } from "./classes/probe";
import { Database } from "./utils/database";
import { from } from "rxjs";
import { switchMap } from "rxjs/operators";

const app = express();
const database = new Database();

app.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    req.next();
});

app.get('/', (req, res) => {
    // body: none
    // response: { value: string }
    res.status(200);
    const db = database.getDb();
    from(db.collection('some_collection').insertOne({ test: true, message: 'this is test' }))
        .pipe(
            switchMap(response => from(db.collection('some_collection').find().toArray())),
        )
        .subscribe(response => {
            res.send({ total: response.length, messages: response.map(a => a.message) });
        });
});

app.get('/api/probe', (req, res) => {
    // body: none
    // response: ICoordinates as JSON
    res.status(200);
    res.send(PROBE.getCoordinates());
});

app.put('/api/probe', (req, res) => {
    // body: ICoordinates as JSON
    // response: { success: boolean }
    console.log('req.body', req.body);
    res.status(200);
    res.send({ success: true });
});

const port = 3000;
database.connect().subscribe(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`));
});
