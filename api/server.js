const jsonServer = require('json-server');
const path = require('path')
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'))
const middlewares = jsonServer.defaults();

const getValue = (obj, path) => path.split('.').reduce((o, key) => o && o[key] ? o[key] : null, obj);

server.use(middlewares);

server.use(jsonServer.bodyParser);

const requiredError = (field) => {
    return {field, code: 'REQUIRED', description: 'field is required'};
};

server.post('/users', (req, res, next) => {
    if (req.method === 'POST') {
        const errors = [];
        const userData = req.body || {};
        const fields = ['firstName', 'lastName', 'address.city', 'address.streetName', 'address.streetNumber'];
        fields.forEach(field => {
            const fieldValue = getValue(userData, field);
            if (!fieldValue) {
                errors.push(requiredError(field));
            }
            if (field === 'email') {

            }
        });
        if (!Array.isArray(userData.contacts) || Array.isArray(userData.contacts) && !userData.contacts.length) {
            errors.push(requiredError(`contacts`));
        } else {
            userData.contacts.forEach((contact, index) => {
                if (!contact.type) {
                    errors.push(requiredError(`contacts[${index}].type`));
                }
                if (contact.type === 'EMAIL') {
                    if (!contact.email) {
                        errors.push(requiredError(`contacts[${index}].email`));
                    } else {
                        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
                        if (!emailRegex.test(contact.email)) {
                            errors.push({
                                field: `contacts[${index}].email`,
                                code: 'INVALID_EMAIL',
                                description: 'email is invalid'
                            });
                        }
                    }
                }
                if (contact.type === 'PHONE' && !contact.phone) {
                    errors.push(requiredError(`contacts[${index}].phone`));
                }
            });
        }
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
