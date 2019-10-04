const { Validator } = require('node-input-validator');

module.exports = (data) => {
    const v = new Validator(
        data,
        { 
            name: 'required|minLength:5', 
            email: 'required|email',
            phone: 'required|phoneNumber',
            age: 'integer'
        },
    );

    return v;
}