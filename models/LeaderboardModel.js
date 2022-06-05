const mongoose = require('mongoose')

const Leader = new mongoose.Schema(
	{
		AverageSpeed: { type: String },
		HighestLevel: { type: String },
		HighestSpeed: { type: String },
		Rank: {type: String},
		
	},
	{ collection: 'LeaderList' }
)

const model = mongoose.model('UserData', Leader)

module.exports = model