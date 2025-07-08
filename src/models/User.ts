import { Schema, model, Document } from 'mongoose';
import { User as UserInterface } from './interfaces'; 

export interface UserDocument extends Omit<UserInterface, '_id'>, Document {
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<UserDocument>({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    dob: {
        type: String, 
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
}, {
    timestamps: true, 
});



const User = model<UserDocument>('User', userSchema);

export default User;
