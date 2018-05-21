const mongoose = require("../../database");

const bcrypt = require("bcryptjs");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        index: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }],
    invites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    }],
});

UserSchema.pre("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;