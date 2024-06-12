import mongoose from 'mongoose';

const historiaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  vehiculo: { type: String, required: true },
  modelo: { type: String, required: true },
  fecha: { type: Date, required: true },
  servicio: { type: String, required: true },
  descripcion: { type: String, required: true }
});

export default mongoose.model('Historia', historiaSchema);
