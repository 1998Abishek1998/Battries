import { Router } from 'express';
import validateSchema from '../shared/validate-schema';
import BatterySchema from '../battery/battery-schema';
import batteryController from '../battery/battery-controller';
import checkBattery from '../middlewares/check-battery';

const router = Router()

router.post('/battries', validateSchema(BatterySchema), checkBattery(), batteryController)

export default router
