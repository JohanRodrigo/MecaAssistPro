import Seguimiento from '../models/Seguimiento.js';

export const getAllItems = async (req, res) => {
  try {
    const items = await Seguimiento.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createItem = async (req, res) => {
  const item = new Seguimiento({
    nombre: req.body.nombre,
    vehiculo: req.body.vehiculo,
    fechaDiagnostico: req.body.fechaDiagnostico,
    estadoDiagnostico: req.body.estadoDiagnostico,
    usuarioId: req.body.usuarioId,
    correo: req.body.correo
  });

  try {
    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const item = await Seguimiento.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.nombre = req.body.nombre;
    item.vehiculo = req.body.vehiculo;
    item.fechaDiagnostico = req.body.fechaDiagnostico;
    item.estadoDiagnostico = req.body.estadoDiagnostico;
    item.usuarioId = req.body.usuarioId;
    item.correo = req.body.correo;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSeguimiento = await Seguimiento.findByIdAndDelete(id);

    if (!deletedSeguimiento) {
      return res.status(404).json({ message: 'Seguimiento not found' });
    }

    res.status(200).json({ message: 'Seguimiento deleted successfully' });
  } catch (error) {
    console.error('Error deleting seguimiento:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};