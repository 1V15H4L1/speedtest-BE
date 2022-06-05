//Dependency injection
const dotenv = require("dotenv");
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/UserModel");
const mongoose = require("mongoose");

dotenv.config();
const port = process.env.PORT;
app.use(express.json());
app.use(cors);
mongoose.connect(process.env.uri).then(() => {
	console.log("db connected");
});

app.post("/api/SignUp", async (req, res) => {
	console.log(req.body);
	try {
		const user = await User.findOne({
			UserName: req.body.UserName,
		});

		if (!user) {
			console.log("user not found");
			await User.create({
				UserName: req.body.UserName,
				Password: req.body.Password,
				Name: req.body.Name
			});
			res.json({ status: "Successfully added" });
		} else {
			await User.findByIdAndUpdate(user._id, { $set: req.body });
			res.json({ status: "Successfully updated" });
		}
	} catch (err) {
		res.json({ status: "Error duplicate values", error: err });
	}
});

app.post("/api/LogIn", async (req, res) => {
	console.log(req.body);
	try {
		const user = await User.findOne({
			UserName: req.body.UserName,
		});
		if (!user) {
			res.json({ status: "Not a registered user" });
		} else {
			if (req.body.Password === user.Password) {
				res.json({ status: "Login Successful",Name: user.Name });
			} else {
				res.json({ status: "Wrong Password" });
			}
		}
	} catch (err) {
		res.json({ status: "Error duplicate values", error: err });
	}
});

app.post("/api/Update", async (req, res) => {
	console.log(req.body);
	try {
		const user = await User.findOne({
			UserName: req.body.UserName,
		});
		if (!user) {
			res.json({ status: "Not a registered user" });
		} else {
			let update = {
				UserName: user.UserName,
				Password: user.Password,
				AverageSpeed: req.body.AverageSpeed
					? req.body.AverageSpeed
					: user.AverageSpeed,
				Rank: req.body.Rank ? req.body.Rank : user.Rank,
				HighestSpeed: req.body.HighestSpeed
					? req.body.HighestSpeed
					: user.HighestSpeed,
				HighestLevel: req.body.HighestLevel
					? req.body.HighestLevel
					: user.HighestLevel,
			};
			await User.findByIdAndUpdate(user._id, { $set: update });
			res.json({ status: "Successfully updated the details" });
		}
	} catch (err) {
		res.json({ status: "Error duplicate values", error: err });
	}
});

app.get("/api/GetAll", async (req, res) => {
	const users = User.find({});
	console.log(users);
	res.send(users);
});

app.listen(port, () => {
	console.log("Server started on", port);
});
