const { Router } = require('express');
const authorize = require('./manual-authorize');
const brands = require('../repositories/manufactures.repository');
const router = Router();
router.use(authorize);
router.get('/', (request, response) => {
	console.log({ params: request.query });
	const { search } = request.query;

	response.send({
		brands: brands.filter((b) => !search || b.name.indexOf(search) !== -1).slice(0, 20),
		totalCount: brands.length
	});
});

module.exports = router;
