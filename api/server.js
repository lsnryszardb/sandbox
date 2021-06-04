const jsonServer = require('json-server');
const path = require('path');
const {validateUserRequest} = require('./routes/users');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults();


server.use(middlewares);

server.use(jsonServer.bodyParser);


server.post('/users', validateUserRequest);
server.put('/users/*', validateUserRequest);

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
