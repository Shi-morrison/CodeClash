import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    profilePicId: mongoose.Types.ObjectId;
}
// User schema
const userSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String },
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
    gamesPlayed: { type: Number, required: true },
    profilePicture: { type: String, },
    dateJoined: { type: Date, default: Date.now },
    country: { type: String },
    rank: { type: String, enum: ['bronze', 'silver', 'gold'] },
    elo: { type: Number, default: 1500 }

});


const User = mongoose.model('User', userSchema);
export default User;