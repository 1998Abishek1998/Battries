import z from '../shared/zod';

const BatterySchema = z.object({
  name: z.string().optional(),
  postCode: z.number().optional(),
  wattCapacity: z.number().optional(),
});

export type BatterySchemaPayload = z.infer<typeof BatterySchema>

export default BatterySchema;
