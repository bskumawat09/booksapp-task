const UserModel = require("../models/user-model");

class UserController {
	async getUser(req, res) {
		const { id } = req.params;
		const user = await UserModel.findById(id);

		res.json({
			status: "success",
			user,
		});
	}

	async createUser(req, res) {
		const data = req.body;

		const user = await UserModel.create(data);

		res.json({
			status: "success",
			user,
		});
	}

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

		user.isPaymentMade = true;
		await user.save();

		const referrer = await UserModel.findById(user.refferedUser);

		if (referrer) {
			referrer.totalEarning += 10;
			await referrer.save();
		}

		res.json({
			status: "success",
			user,
			referrer,
		});
	}
}

module.exports = new UserController();
