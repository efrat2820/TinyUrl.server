import express from 'express'
import UserController from "../Controllers/userController.js"

const router = express.Router();

router.get('/',UserController.getList);

router.get('/:id',UserController.getById);

router.put('/:id',UserController.update);

router.post('/',UserController.add);

router.delete('/:id',UserController.delete);


export default router;