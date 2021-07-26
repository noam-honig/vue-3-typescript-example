import express from 'express';
import { initExpress } from 'remult/server';

import '../types/Tutorial';


let app = express();
initExpress(app);
app.listen(3002, () => console.log("Server started"));