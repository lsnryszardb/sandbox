const jsonServer = require('json-server');
const path = require('path')
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post('/users', (req, res, next) => {
    if (req.method === 'POST') {
        const errors = [];
        const userData = req.body || {};
        const fields = ['firstName', 'lastName', 'email'];
        fields.forEach(field => {
            if (!userData[field]) {
                errors.push({field, code: 'REQUIRED', description: 'field is required'});
            }
            if (field === 'email') {
                const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                if (!emailRegex.test(userData[field])) {
                    errors.push({field, code: 'INVALID_EMAIL', description: 'email is invalid'});
                }
            }
        });
        if (errors.length > 0) {
            res.status(400).jsonp(errors);
        } else {
            next();
        }
    }
});

// Use default router
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
