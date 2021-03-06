const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		refferedUser: {
			type: Schema.Types.ObjectId,
			ref: "User",
			default: null,
		},
		isPaymentMade: {
			type: Boolean,
			default: false,
		},
		totalEarning: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema, "users");
