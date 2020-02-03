import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
    name: string;
    isActive: boolean;
}

const BrandSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true, default: true }
});

export default mongoose.model<IBrand>('Brand', BrandSchema);
