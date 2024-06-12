import mongoose from 'mongoose';

const seguimientoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  vehiculo: { type: String, required: true },
  fechaDiagnostico: { type: Date, required: true },
  estadoDiagnostico: { type: String, required: true },
  usuarioId: { type: String, required: true },
  correo: { type: String, required: true }
});

const Seguimiento = mongoose.model('Seguimiento', seguimientoSchema);

export default Seguimiento;
