import BatteryType from './battery/battery-type';
import Attachments from './shared/attachments';

declare module 'express-serve-static-core' {
    export interface Request {
        session?: {
            token?: string;
        };
        attachments: Attachments;
        services:{
          batteryService: BatteryType
        }
    }
}

export {};
