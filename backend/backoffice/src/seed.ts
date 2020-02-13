import envConfig from './config';
import { Seeder } from 'mongo-seeding';
import manufacturerSeed from './seeds/manufacturers.seed';

const config = {
    database: envConfig.MONGO_CONNECTION_STRING,
    dropDatabase: true,
  };

  const seeder = new Seeder(config);

  seeder.import([ manufacturerSeed ]).then(() => {
      console.log('seed done');
  });