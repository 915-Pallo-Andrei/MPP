import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IUserData extends Document {
    user_id: number;    
    brand_id: number;
    username: string;
    password: string;
}

const UserDataSchema: Schema = new Schema({
    user_id: { type: Number },
    brand_id: { type: Number, required: true},
    username: { type: String, required: true },
    password: { type: String, required: true }
});

UserDataSchema.plugin(AutoIncrement, {inc_field: 'user_id' });

export const UserDataModel = mongoose.model<IUserData>('UserData', UserDataSchema);