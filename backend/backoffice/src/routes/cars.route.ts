import { Router, Request, Response } from 'express';
import isAuthorizedMiddleware from '../middlewares/isAuthorized';
import { brandRepository } from '../repositories';

const router = Router();

// router.use(isAuthorizedMiddleware);

router.get('/add', async (request: Request, response: Response) => {
    if (!request?.query?.name) {
        response.status(400).send();
    }
    const newBrand = new brandRepository({ name: request.query.name });
    var dd = await newBrand.save();

    response.send(dd)
});
router.get('/', async (request: Request, response: Response) => {
    const brands = await brandRepository.find().exec();
    response.send({
        brands: brands.map(b => b.toJSON()),
        totalCount: brands.length
    })
});


export default router;
