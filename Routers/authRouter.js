import express from 'express'
import AuthCntroller from '../Controllers/authController.js'

const router = express.Router();

router.post('/',AuthCntroller.login);
router.get('/',AuthCntroller.register)

export default router;