const http = require('http');
const fs = require('fs').promises;

const PORT = 8081;

const requestHandler = async (request, response) => {
  //   if (request.url.indexOf('./home') >= 0) {
  //     response.writeHead(200, { 'Content-type': 'text/json' });
  //     //   response.end('<h1>Hello, my first Server!</h1>');
  //     // response.end(JSON.stringify({ a: 1, b: 2, c: [] }));
  //     return response.end(`{"url": "homepage"}`);
  //   }
  const manifest = await fs.readFile('./package.json', 'utf8');
  response.writeHead(200, { 'Content-type': 'text/json' });
  //   return response.end(`{"url": "other"}`);
  return response.end(manifest);
};

const server = http.createServer(requestHandler);

server.listen(PORT, (error) => {
  if (error) {
    console.log('Error at server launch:', error);
  }
  console.log(`Server starts at port: ${PORT}`);
});
