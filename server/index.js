const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const downloadCountries = require('./src/controllers/DownloadCountries.js')

conn.sync({ force: true }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
downloadCountries()
}).catch(error => console.error(error))