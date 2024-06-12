import axios from "./axios";

const API= 'http://localhost:3000/api'

export const registerRequest = user => axios.post(`/register`, user);
export const getClients = () => axios.get(`${API}/clients`);

export const loginRequest = user => axios.post(`/login`,user)

export const logoutRequest = () => {
  return axios.post(`${API}/logout`, {}, { withCredentials: true });
};

export const loginRequestA = user => {
  return axios.post(`/loginA`,user)
    /*.catch(error => {
      console.error('Error en la solicitud de registro:', error);
      throw error; // Relanzar el error para que pueda ser manejado en el componente que llama a esta función
    });*/
}

export const registerRequestA = user => {
    return axios.post(`/registerA`, user)
      /*.catch(error => {
        console.error('Error en la solicitud de registro:', error);
        throw error; // Relanzar el error para que pueda ser manejado en el componente que llama a esta función
      });*/
  }

  export const getVehicles = () => axios.get(`${API}/vehicles/all`);
  export const createVehicle = (vehicle) => axios.post(`${API}/vehicles`, vehicle);
  export const updateVehicle = (id, vehicle) => axios.put(`${API}/vehicles/${id}`, vehicle);
  export const deleteVehicle = (id) => axios.delete(`${API}/vehicles/${id}`);

export const getUsers = () => axios.get(`${API}/users`);
export const updateUser = (id, user) => axios.put(`${API}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${API}/users/${id}`);

export const getCitas = async () => {
  try {
    const response = await axios.get(`${API}/citas`);
    return response;
  } catch (error) {
    console.error('Error fetching citas:', error);
    throw error;
  }
};

export const createCita = async (citaData) => {
  try {
    const response = await axios.post(`${API}/citas`, citaData);
    return response;
  } catch (error) {
    console.error('Error creating cita:', error);
    throw error;
  }
};

export const updateCita = async (id, citaData) => {
  try {
    const response = await axios.put(`${API}/citas/${id}`, citaData);
    return response;
  } catch (error) {
    console.error('Error updating cita:', error);
    throw error;
  }
};

export const deleteCita = async (id) => {
  try {
    const response = await axios.delete(`${API}/citas/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting cita:', error);
    throw error;
  }
};

export const getSeguimiento = async () => {
  try {
    const response = await axios.get(`${API}/seguimiento`);
    return response;
  } catch (error) {
    console.error('Error fetching seguimiento:', error);
    throw error;
  }
};

export const createSeguimiento = async (seguimientoData) => {
  try {
    const response = await axios.post(`${API}/seguimiento`, seguimientoData);
    return response;
  } catch (error) {
    console.error('Error creating seguimiento:', error);
    throw error;
  }
};

export const updateSeguimiento = async (id, seguimientoData) => {
  try {
    const response = await axios.put(`${API}/seguimiento/${id}`, seguimientoData);
    return response;
  } catch (error) {
    console.error('Error updating seguimiento:', error);
    throw error;
  }
};

export const deleteSeguimiento = async (id) => {
  try {
    const response = await axios.delete(`${API}/seguimiento/${id}`);
    return response;
  } catch (error) {
    console.error('Error deleting seguimiento:', error);
    throw error;
  }
};

export const getHistoria = async () => {
  try {
    const response = await fetch(`${API}/historial`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error fetching historia:', error);
    throw error;
  }
};

export const createHistoria = async (data) => {
  try {
    const response = await fetch(`${API}/historial`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating historia:', error);
    throw error;
  }
};

export const updateHistoria = async (id, data) => {
  try {
    const response = await fetch(`${API}/historial/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating historia:', error);
    throw error;
  }
};

export const deleteHistoria = async (id) => {
  try {
    const response = await fetch(`${API}/historial/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting historia:', error);
    throw error;
  }
};

export const registerCita = async (citaData) => {
  return await axios.post(`${API}/citas`, citaData);
};

export const getCitasByEmail = async (email) => {
  return await axios.get(`${API}/citas/email/${email}`);
};

// Nueva función para enviar el correo de restablecimiento de contraseña
export const sendResetPasswordEmail = async (email) => {
  try {
    const response = await axios.post(`${API}/forgot-password`, { email });
    return response;
  } catch (error) {
    console.error('Error al enviar el correo de restablecimiento:', error);
    throw error;
  }
};

// Nueva función para restablecer la contraseña
export const resetPassword = async (data) => {
  try {
    const response = await axios.post(`${API}/reset-password`, data);
    return response;
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    throw error;
  }
};

export const verityTokenRequet =()=> axios.get('/verify')