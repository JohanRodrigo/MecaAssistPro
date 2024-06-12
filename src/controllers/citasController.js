// controllers/citasController.js
import Cita from '../models/Cita.js';
import User from '../models/user.model.js';

export const getCitas = async (req, res) => {
  try {
    const citas = await Cita.find();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching citas', error });
  }
};
export const getCitasByEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const citas = await Cita.find({ userId: user._id });
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear nueva cita
export const createCita = async (req, res) => {
  const { nombreCliente, tipoServicio, fechaHora, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const newCita = new Cita({
      nombreCliente,
      tipoServicio,
      fechaHora,
      userId,
      userEmail: user.email  // Guardar el correo del usuario
    });

    const savedCita = await newCita.save();
    res.status(201).json(savedCita);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar cita
export const updateCita = async (req, res) => {
  const { id } = req.params;
  const { nombreCliente, tipoServicio, fechaHora, userId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const updatedCita = await Cita.findByIdAndUpdate(id, {
      nombreCliente,
      tipoServicio,
      fechaHora,
      userId,
      userEmail: user.email  // Actualizar el correo del usuario
    }, { new: true });

    res.status(200).json(updatedCita);
  } catch (error) {
    res.status(500).json({ message: 'Error actualizando la cita', error });
  }
};

export const deleteCita = async (req, res) => {
  const { id } = req.params;
  try {
    await Cita.findByIdAndDelete(id);
    res.status(200).json({ message: 'Cita deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting cita', error });
  }
};

// Registrar una nueva cita
export const registerCita = async (req, res) => {
  const { nombreCliente, tipoServicio, fechaHora, email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const nuevaCita = new Cita({
      nombreCliente,
      tipoServicio,
      fechaHora,
      userId: user._id,
    });

    const citaGuardada = await nuevaCita.save();
    res.status(201).json(citaGuardada);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};