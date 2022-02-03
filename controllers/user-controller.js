const UserModel = require("../models/user-model");

class UserController {
	// reward the referrer for the first payment made
	async rewardReferrer(req, res) {
		const { uid } = req.body;

		if (!uid) {
			return res.json({
				status: "error",
				message: "user id is required",
			});
		}

		const user = await UserModel.findById(uid);

		if (!user) {
			return res.json({
				status: "error",
				message: "user not found",
			});
		}

		const referrer = await UserModel.findById(user.refferedUser);

		if (referrer && user.isPaymentMade == false) {
			user.isPaymentMade = true;
			await user.save();

			referrer.totalEarning += 10;
			await referrer.save();
		}

		res.json({
			status: "success",
			user,
			referrer,
		});
	}

	async getAllUsers(req, res) {
		const users = await UserModel.find();

		res.json({
			status: "success",
			results: users.length,
			users,
		});
	}

	async getUser(req, res) {
		const { id } = req.params;
		const user = await UserModel.findById(id);

		if (!user) {
			return res.status(400).json({
				status: "error",
				message: "user not found",
			});
		}

		res.json({
			status: "success",
			user,
		});
	}

	async createUser(req, res) {
		try {
			const data = req.body;
			const user = await UserModel.create(data);

			res.json({
				status: "success",
				user,
			});
		} catch (err) {
			res.status(500).json({
				status: "error",
				message: err.message,
			});
		}
	}
}

module.exports = new UserController();
