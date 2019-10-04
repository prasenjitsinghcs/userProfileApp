const Users = require('./../models/Users');
const validateUser = require('./../helpers/userValidation');

const controller = function () { };

/**
 * @method getUsers
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
controller.prototype.getUsers = async (req, res) => {
    try {
        const userList = await Users.find({});
        res.json({
            data: userList
        });
    } catch(error) {
        res.json({
            message: 'Error while fetching user list',
            errors: [error.message]
        });
    }
}

/**
 * @method createUser
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
controller.prototype.createUser = async (req, res) => {
    try {
        const data = req.body;
        const v = validateUser(data);
        let matched = await v.check();

        console.log(matched);

        if (!matched) {
            const error = new Error();
            error.errors = v.errors;
            throw error;
        } else {
            const user = await Users.create(data);
            res.json({
                message: 'user successfully added',
                user,
            });
        }
    } catch(error) {
        res.status(400);
        res.json({
            message: 'Error while adding user',
            errors: error.errors || [error.message]
        });
    }
}

/**
 * @method deleteUser
 * @param {object} req
 * @param {object} res
 * @returns {object} response
 */
controller.prototype.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
    
        if (!id) {
            throw new Error('User id not found or invalid');
        } else {
            const user = await Users.findOne({_id:id});
    
            if (user) {
                const result = await Users.deleteOne({_id:id});
                res.json({
                    message: 'User successfully deleted'
                });
            } else {
                throw new Error('User not found with the given id');
            }
        }
    } catch (error) {
        res.status(400);
        res.json({
            message: 'Error while deleting user',
            errors: [error.message]
        });
    }
}

module.exports = new controller();