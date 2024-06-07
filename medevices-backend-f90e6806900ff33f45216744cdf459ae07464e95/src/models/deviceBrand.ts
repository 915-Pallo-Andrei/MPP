import mongoose, { Schema, Document } from 'mongoose';
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IBrand extends Document {
    brand_id: number;
    name: string;
}

const BrandSchema: Schema = new Schema({
    brand_id: { type: Number },
    name: { type: String, required: true }
});

BrandSchema.plugin(AutoIncrement, {inc_field: 'brand_id' });

export const BrandModel = mongoose.model<IBrand>('Brand', BrandSchema);