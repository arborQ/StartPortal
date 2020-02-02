const { Router } = require('express');
const authorize = require('./manual-authorize');

const router = Router();
router.use(authorize);
router.get('/', (_, response) => {
    response.send({ brands: [ 'Toyota', 'Volvo' ] });
});

module.exports = router;