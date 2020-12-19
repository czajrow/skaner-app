import express = require("express");
import bodyParser = require('body-parser')
import { ICoordinates } from "./classes/probe";
import { SCANNER } from "./classes/scanner";

const app = express();
const jsonParser = bodyParser.json()

app.use((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    req.next();
});

app.get('/api/probe', (req, res) => {
    // body: none
    // response: ICoordinates as JSON
    res.status(200);
    res.send(SCANNER.getCoordinates());
});

app.put('/api/probe', jsonParser, (req, res) => {
    // body: ICoordinates as JSON
    // response: { success: boolean }
    SCANNER.moveProbe(req.body as ICoordinates);
    res.status(200);
    res.send({ success: true });
});

const port = 3001;
app.listen(port, () => console.log(`App listening on port ${port}!`));
