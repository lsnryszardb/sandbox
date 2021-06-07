const requiredError = (field) => {
    return {field, code: 'REQUIRED', description: 'field is required'};
};

const getValue = (obj, path) => path.split('.').reduce((o, key) => o && o[key] ? o[key] : null, obj);

const validateUserRequest = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
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
};
module.exports = {validateUserRequest};
