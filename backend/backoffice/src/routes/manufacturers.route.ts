import { Router, Request, Response } from 'express';
import isAuthorizedMiddleware from '../middlewares/isAuthorized';
import { manufacturersRepository } from '../repositories';

const router = Router();

router.use(isAuthorizedMiddleware);

router.post('/', async (request: Request, response: Response) => {
    if (!request?.body?.name) {
        response.status(400).send();
    }
    const newBrand = new manufacturersRepository({ name: request.body.name });
    var dd = await newBrand.save();

    response.send(dd)
});

router.delete('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    await manufacturersRepository.findByIdAndDelete(id).exec();
    response.send();
});

router.put('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const { model } = request.body;
    const brand = await manufacturersRepository.findByIdAndUpdate(id, model).exec();
    response.send(brand.toJSON());
});

router.get('/:id', async (request: Request, response: Response) => {
    const { id } = request.params;
    const brand = await manufacturersRepository.findById(id);
    response.send(brand.toJSON());
});

router.get('/', async (request: Request, response: Response) => {
    const { search } = request.query;
    const totalCount = await manufacturersRepository.count({}).exec();
    const brands = await manufacturersRepository.find({
        'name': { '$regex': search, $options: 'i' }
    }
    ).limit(30).exec();
    
    response.send({
        brands: brands.map(b => b.toJSON()),
        totalCount
    })
});


export default router;
