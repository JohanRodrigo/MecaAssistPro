import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  licensePlate: {
    type: String,
    required: true,
    unique: true,
  },
  lastServiceDate: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Vehicle', vehicleSchema);
