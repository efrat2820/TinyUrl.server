import express from 'express'
import LinkController from "../Controllers/linkController.js"

const router = express.Router();

router.get('/',LinkController.getList);

router.get('/:id',LinkController.getById);

//router.get('/r/:uniqueName',LinkController.redirect)

router.put('/:id',LinkController.update);

router.post('/',LinkController.add);

router.post('/:uniqueName/target',LinkController.addTarget);

router.delete('/:id',LinkController.delete);


export default router;