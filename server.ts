// Copyright 2018 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import express, {Express, Request, Response} from 'express';
import ConnectionHandler from './src/connectionHandler';
const PORT = process.env.PORT || 8080;
const app: Express = express();
global["custom"] = {};
global["custom"]["connection"] = '00';

app.get('/', (req: Request, res: Response) => {
  console.log(`Hello TypeScript! ${PORT}`);
  res.send(`🎉 Hello TypeScript! with Laxmi new 1234 🎉 ${global["custom"]["connection"]}`);
});

const server = app.listen(PORT, () => {
  new ConnectionHandler();
  console.log(`App listening on port ${PORT}`);
});

module.exports = server;
