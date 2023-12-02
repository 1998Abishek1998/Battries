import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FilterBatteryKey } from '../middlewares/check-battery';

const batteryController = async (req: Request, res: Response) => {

  if(req.body.wattCapacity && req.body.name && req.body.postCode)  await req.services.batteryService.postBattery(req.body)

  const queryKey = req.attachments.get(FilterBatteryKey);
  const batteryData = await req.services.batteryService.fetchBattery({ limit: Number(req.query.limit), offset: Number(req.query.offset), query: queryKey})
  
  const [currentPageTotalWatt, currentPageAvgWatt] = await Promise.all([
    batteryData.paginationData.data.reduce((acc, battery) => acc + battery.wattCapacity, 0),
    batteryData.paginationData.data.reduce((acc, battery) => acc + battery.wattCapacity, 0) / batteryData.paginationData.data.length,
  ])

  const data = {
    totalData: {
      totalWattCapacity: Number((batteryData.totalWattCapacity).toFixed(2)),
      averageWattCapacity: Number((batteryData.averageWattCapacity).toFixed(2)),
    },
    currentPageData: {
      currentPageTotalWatt: Number((currentPageTotalWatt).toFixed(2)),
      currentPageAvgWatt: Number((currentPageAvgWatt).toFixed(2)) || 0
    },
    battries: batteryData.paginationData.data,
    meta: batteryData.paginationData.meta
  }

  res.status(StatusCodes.OK).json({
    message: 'Data fetched Successfully.',
    data,
  })
}

export default batteryController
