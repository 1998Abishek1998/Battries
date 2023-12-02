import { Request } from 'express';
import Attachments from './attachments';
import BatteryService from '../battery/battery-service';

class DependencyInjectionSetup {
  static setup(req: Request) {

    const attachments = new Attachments();
    const batteryService = new BatteryService()

    req.attachments = attachments;
    req.services = {
      batteryService: batteryService,
    }

  }
}

export default DependencyInjectionSetup;
