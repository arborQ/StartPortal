const { Router } = require('express');

const router = Router();

router.post('/', (_, response) => {
    response.send({ ok: true, name: 'test' });
});

module.exports = router;