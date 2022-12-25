import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator"

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        lastName: {
            type: String,
            required: true,
            min: 2,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            min: 2,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },
        picturePath: {
            type: String,
            default: "",
          },
        role: {
            type: String,
            enum: ["manager", "admin"],
            default: "manager",
            min: 5,
        },
    }, { timestamps: true }
);


// static login method
UserSchema.statics.login = async function(email, password) {
    if(!email || !password) {
        throw Error('All fields must be filled')
    }
    const user = await this.findOne({email})
    if(!user) {
        throw Error('Incorrect email')
    }
    const match = await bcrypt.compare(password, user.password)

    if(!match) {
        throw Error('Incorrect password')
    }
    return user
}

const User = mongoose.model("User", UserSchema);
export default User;
