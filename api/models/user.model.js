import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default:"https://papirvaerk.dk/cdn/shop/files/bea-muller-the-woman-with-the-swirls-rund-950768.png?v=1717057312&width=750"
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
},{timestamps: true}
);

const User = mongoose.model('User', userSchema);
export default User;