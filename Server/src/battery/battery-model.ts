import { Schema, model } from 'mongoose';
import { BatteryModel } from './battery-type';

const BatterySchema = new Schema({
  name: {
    type: String,
    required: [true, 'Battery must have a name.'],
    minLength: [5, 'name must be minimum of 5 characters'],
    maxLength: [30, 'name must be maximum of 30 characters'],
  },
  postCode: {
    type: Number,
    required: [true, 'Post code must not be empty.'],
    minLength: [5, 'Post Code must be minimum of 5 characters'],
    maxLength: [20, 'Post Code must be maximum of 30 characters'],
  },
  wattCapacity: {
    type: Number,
    required: [true, 'Please provide wattCapacity.']
  }
}, 
{
  timestamps: true,
  versionKey: false,
});

const Battery = model<BatteryModel>('battery', BatterySchema);

export default Battery;
