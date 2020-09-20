require("dotenv").config();
import mongoose, { Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jwt from 'jsonwebtoken';

interface Token {
    token: string;
};

export interface User {
  email: string;
  password: string;
  name: string;
  tokens: Token[];
}

export interface UserDoc extends User, Document {
    generateToken: (this: UserDoc) => Promise<string>;
}
export interface UserModel extends Model<UserDoc> {
    getByCredentials: (this: UserModel, email: string, password: string) => Promise<UserDoc>;
}

const validatePassword = (pwd: string): boolean => {
    // Minimum eight characters, at least one uppercase letter, one lowercase letter and one number
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    return re.test(pwd);
};

const userSchema = new Schema<UserDoc>({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validator.isEmail, 'Please fill a valid email address'],
    },
    password: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.static('getByCredentials', async function(this: UserModel, email: string, password: string) {
    try {
        const user = await this.findOne({ email });
        if (user?.password) {
            if (!await bcrypt.compare(password, user?.password)) throw new Error();
            return user;
        };
    } catch (e) {
        throw new Error("Unable to authenticate.");
    }
})

userSchema.method('generateToken', async function(this: UserDoc) {
    const user = this;
    const token = await jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token
})

userSchema.pre('save', async function (this: UserDoc) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
})

export default mongoose.model('user', userSchema) as UserModel;
