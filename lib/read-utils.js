const fs = require('fs');
const dummyjson = require('dummy-json');

getRandomPayload = (filePath) => {
    const template = fs.readFileSync(filePath, { encoding: 'utf8' });
    const generatedPayloadString = dummyjson.parse(template);
    return JSON.parse(generatedPayloadString);
};

constructAuthPayload = (email, password) => {
  let payload = {};
  payload.username = email;
  payload.password = password;

  return payload;
};

module.exports = {
    getRandomPayload, constructAuthPayload
 };