import mongoose, { Schema, Document } from 'mongoose';

export interface IBrand extends Document {
    id: string;
    name: string;
    isActive: boolean;
}

const BrandSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true, default: true }
});

const repository = mongoose.model<IBrand>('Brand', BrandSchema);

BrandSchema.set('toJSON', { virtuals: true });

export const brandRepository = repository;
