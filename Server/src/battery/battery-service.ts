import { filters, paginateResponse } from '../shared/pagination';
import Battery from './battery-model';
import { BatterySchemaPayload } from './battery-schema';
import BatteryType, { BatteryFilter, BatteryResponse } from './battery-type';

class BatteryService implements BatteryType {
  static instance: BatteryType;

  constructor() {
    if (BatteryService.instance) {
      return BatteryService.instance;
    }
    BatteryService.instance = this;
  }

  async postBattery(payload: BatterySchemaPayload): Promise<void> {
    await Battery.create(payload)
  }
  
  async fetchBattery(filter: BatteryFilter): Promise<BatteryResponse> {
    const page = filter.offset || filters.offset;
    const limit = filter.limit || filters.limit;
    const skip = (page - 1) * limit;
    
    const [data, total, averageData] = await Promise.all([
      Battery.find(filter.query).sort({ name: 1 }).limit(limit).skip(skip).exec(),
      Battery.find(filter.query).countDocuments(),
      Battery.aggregate([
        {
          $group: {
            _id: null,
            totalWattCapacity: { $sum: '$wattCapacity' },
            averageWattCapacity: { $avg: '$wattCapacity' },
          },
        },
      ])
    ]);

    const { totalWattCapacity, averageWattCapacity } = averageData[0];

    return {
      paginationData: paginateResponse(data, page, limit, total),
      totalWattCapacity,
      averageWattCapacity
    } 
  } 
}

export default BatteryService;
