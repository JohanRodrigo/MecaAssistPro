
import Vehicle from "../models/vehicle.model.js";

export const createVehicle = async (req, res) => {
  try {
    console.log("Datos del vehículo a crear:", req.body); // Agrega este registro para imprimir los datos del vehículo a crear
    const nuevoVehiculo = await Vehicle.create(req.body);
    // Envía la respuesta una vez que se haya creado el vehículo
    res.status(201).json(nuevoVehiculo);
  } catch (error) {
    console.error("Error al crear el vehículo:", error); // Agrega este registro para imprimir cualquier error durante la creación del vehículo
    // Maneja cualquier error que ocurra durante la creación del vehículo
    res.status(500).json({ message: error.message });
  }
};

// Obtener todos los vehículos
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un vehículo por su ID
export const getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }
    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar un vehículo existente
export const updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }
    
    Object.assign(vehicle, req.body); // Actualiza el vehículo con los datos del cuerpo de la solicitud
    await vehicle.save(); // Guarda los cambios en la base de datos

    res.json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un vehículo existente
export const deleteVehicle = async (req, res) => {
  try {
    const vehicleEliminado = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicleEliminado) {
      return res.status(404).json({ message: "Vehículo no encontrado" });
    }
    res.json({ message: "Vehículo eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};