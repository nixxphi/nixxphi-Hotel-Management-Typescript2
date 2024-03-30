import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    role: 'admin' | 'guest';
    deleted: boolean;
}

const userSchema: Schema<IUser> = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'guest'],
        default: "guest"
    },
    deleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export default model<IUser>('User', userSchema);
