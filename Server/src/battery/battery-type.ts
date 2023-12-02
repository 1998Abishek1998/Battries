import { Pagination, PaginationFilter } from '../shared/pagination';
import { QueryKey } from '../shared/types';
import { BatterySchemaPayload } from './battery-schema';

interface BatteryType {
  postBattery(payload: BatterySchemaPayload): Promise<void>
  fetchBattery(filter: BatteryFilter): Promise<BatteryResponse>
}

export default BatteryType;

export interface BatteryResponse {
  paginationData: Pagination<BatteryModel>,
  totalWattCapacity: number
  averageWattCapacity: number
}

export interface BatteryModel {
  name: string
  postCode: number
  wattCapacity: number
}

export interface BatteryFilter extends PaginationFilter{
  query: QueryKey
}

