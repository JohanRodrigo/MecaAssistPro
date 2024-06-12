import Historia from '../models/Historia.js';

export const getAllHistorial = async (req, res) => {
  try {
    const historial = await Historia.find();
    res.status(200).json(historial);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createHistoria = async (req, res) => {
  const { nombre, vehiculo, modelo, fecha, servicio, descripcion } = req.body;

  const nuevaHistoria = new Historia({ nombre, vehiculo, modelo, fecha, servicio, descripcion });

  try {
    const historiaGuardada = await nuevaHistoria.save();
    res.status(201).json(historiaGuardada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateHistoria = async (req, res) => {
  const { id } = req.params;

  try {
    const historiaActualizada = await Historia.findByIdAndUpdate(id, req.body, { new: true });
    if (!historiaActualizada) return res.status(404).json({ message: 'Historia no encontrada' });
    res.status(200).json(historiaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteHistoria = async (req, res) => {
  const { id } = req.params;

  try {
    const historiaEliminada = await Historia.findByIdAndDelete(id);
    if (!historiaEliminada) return res.status(404).json({ message: 'Historia no encontrada' });
    res.status(200).json({ message: 'Historia eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
