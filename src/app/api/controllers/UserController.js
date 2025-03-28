const User = require('../models/User');

async function create(req, res) {
    const user = new User(req.body)
    const userCreate = await user.save()
    res.status(201).json(userCreate)
}

export {create}