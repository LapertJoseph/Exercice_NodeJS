const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body><h1>Hello and Welcome to my page</h1></body>");
    res.write(
        '<body><form action="/create-user" method="POST"><input type="text" name="create-user"><button type="submit">Send</button></form></body>'
      );
    res.write("</html>");
    res.end();
  }
  if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My User's Page</title></head>");
    res.write("<body><ul><li>User 1</li><li>User 2</li></ul></body>");
    res.write("</html>");
    res.end();
  }
  if(url === "/create-user" && method === 'POST'){
    const body = [];
    req.on('data', (chunk) => {
        body.push(chunk);
    })
    return req.on('end', () =>{
        const parsedBody = Buffer.concat(body).toString();
        const username = parsedBody.split("=")[1];
        fs.writeFile('username.txt', username, (err) => {
            res.statusCode = 302;
            res.setHeader('Location', "/");
            return res.end();
        })
    })
  }
};

module.exports = requestHandler;
