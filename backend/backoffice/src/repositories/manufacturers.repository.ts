import mongoose, { Schema, Document } from 'mongoose';

export interface IManufacturer extends Document {
    id: string;
    name: string;
    isActive: boolean;
}

const BrandSchema: Schema = new Schema({
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, required: true, default: true }
});
export const collectionName = 'manufacturers';

const repository = mongoose.model<IManufacturer>(collectionName, BrandSchema);

BrandSchema.set('toJSON', { virtuals: true });

export const manufacturersRepository = repository;
