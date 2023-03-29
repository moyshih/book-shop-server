import express from 'express';
const router = express.Router();

import purchaseController from './../controllers/purchaseController.js';

router.get('/:userId', purchaseController.getPurchases);
router.post('/', purchaseController.createPurchase);

export default router;