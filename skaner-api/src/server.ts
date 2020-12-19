import express = require("express");
import { PROBE } from "./classes/probe";

const app = express();

app.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    req.next();
});

app.get('/', (req, res) => {
    // body: none
    // response: { value: string }
    res.status(200);
    res.send({ total: 4, messages: [0, 1, 2, 3] });
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
app.listen(port, () => console.log(`App listening on port ${port}!`));
