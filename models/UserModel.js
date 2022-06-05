const mongoose = require('mongoose')

const User = new mongoose.Schema(
	{
		UserName: { type: String, required: true,unique: true },
		Password: { type: String, required: true },
		Name: { type: String }
	},
	{ collection: 'UserMembers' }
)

const model = mongoose.model('UserData', User)

module.exports = model