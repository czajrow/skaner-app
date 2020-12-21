import express = require("express");
import bodyParser = require('body-parser')
import { SCANNER } from "./classes/scanner";
import cors = require('cors')
import { ICoordinates, IParameters, IScanStatus } from "./classes/types";

const app = express();
const jsonParser = bodyParser.json()

app.use(cors());
// app.use((req, res) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     req.next();
// });

app.get('/api/probe', (req, res) => {
    // body: none
    // response: ICoordinates as JSON
    res.status(200);
    res.send(SCANNER.getProbeCoordinates());
});

app.put('/api/probe', jsonParser, (req, res) => {
    // body: ICoordinates as JSON
    // response: { success: boolean }
    SCANNER.moveProbe(req.body as ICoordinates);
    res.status(200);
    res.send({ success: true });
});

app.post('/api/parameters', jsonParser, (req, res) => {
    // body: ICoordinates as JSON
    // response: { success: boolean }
    SCANNER.scan(req.body as IParameters);
    res.status(200);
    res.send({ success: true });
});

app.get('/api/status', (req, res) => {
    // body: none
    // response: IScanStatus as JSON
    res.status(200);
    res.send({ status: SCANNER.getStatus() as IScanStatus });
});

app.get('/api/result', (req, res) => {
    // body: none
    // response: (IResult | { error: string }) as JSON
    const result = SCANNER.getResult();
    if (!!result) {
        res.status(200);
        res.send(result);
    } else {
        res.status(404);
        res.send({ error: 'You have to finish scan before downloading results.' });
    }
});

const port = 3001;
app.listen(port, () => console.log(`App listening on port ${port}!`));
