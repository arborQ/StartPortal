export { brandRepository } from './brand.repository';

import mongoose from 'mongoose';
import config from '../config';

const { MONGO_CONNECTION_STRING } = config;

export async function connectToDatabase() {
    return await mongoose.connect(MONGO_CONNECTION_STRING,{ useNewUrlParser: true, useUnifiedTopology: true });
}