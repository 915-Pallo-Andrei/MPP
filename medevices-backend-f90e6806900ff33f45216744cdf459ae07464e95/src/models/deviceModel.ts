import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IDevice extends Document {
    id: number;
    name: string;
    price: number;
    brand: string;
    image: string;
}

const DeviceSchema: Schema = new Schema({
    id: { type: Number },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    image: { type: String, required: true }
});

DeviceSchema.plugin(AutoIncrement, {inc_field: 'id' });

export const DeviceModel = mongoose.model<IDevice>('Device', DeviceSchema);