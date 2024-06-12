import mongoose from "mongoose";

const citaSchema = new mongoose.Schema({
  nombreCliente: {
    type: String,
    required: true,
  },
  tipoServicio: {
    type: String,
    required: true,
  },
  fechaHora: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userEmail: {  // Campo para almacenar el correo del usuario
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('Cita', citaSchema);
