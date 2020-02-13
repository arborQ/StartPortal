import { Router, Request, Response } from 'express';
import isAuthorizedMiddleware from '../middlewares/isAuthorized';
import { brandRepository } from '../repositories';

const router = Router();

router.use(isAuthorizedMiddleware);

router.post('/', async (request: Request, response: Response) => {
    if (!request?.body?.name) {
        response.status(400).send();
    }
    const newBrand = new brandRepository({ name: request.body.name });
    var dd = await newBrand.save();

    response.send(dd)
});

router.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const { model } = request.body;
    const brand = await brandRepository.findByIdAndUpdate(id, model);
    response.send(brand.toJSON());
});

router.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const brand = await brandRepository.findById(id);
    response.send(brand.toJSON());
});

router.get('/', async (request: Request, response: Response) => {
    const { search } = request.query;
    const totalCount = await brandRepository.count({}).exec();
    const brands = await brandRepository.find({
        'name': { '$regex': search, $options: 'i' }
    }
    ).exec();
    response.send({
        brands: brands.map(b => b.toJSON()),
        totalCount
    })
});


export default router;
