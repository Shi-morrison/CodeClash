import mongoose from 'mongoose';

// User schema
const userSchema = new mongoose.Schema({
    githubId: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
    gamesPlayed: { type: Number, required: true },
    elo: { type: Number, required: true }

});


const User = mongoose.model('User', userSchema);
export default User;