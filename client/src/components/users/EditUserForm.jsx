import { useState, useEffect } from 'react';
import api from '../../services/api';

export default function EditUserForm({ userId, onUserUpdated, onClose }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'Usuario',
    status: 'Activo'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordChanged, setPasswordChanged] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`);
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          email: response.data.email,
          password: '',
          phoneNumber: response.data.phoneNumber || '',
          role: response.data.role,
          status: response.data.status
        });
      } catch (error) {
        console.error('Error fetching user:', error);
        setErrors({ general: 'Error al cargar los datos del usuario' });
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      password: value
    });
    setPasswordChanged(value !== '');
    
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    try {
      const updateData = { ...formData };
      
      // Solo enviar password si fue modificado
      if (!passwordChanged) {
        delete updateData.password;
      }

      const response = await api.put(`/users/${userId}`, updateData);
      
      setSuccessMessage('Usuario actualizado correctamente');
      onUserUpdated(response.data.data);
      
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error) {
      console.error('Error updating user:', error);
      
      if (error.response?.data?.errors) {
        const validationErrors = {};
        error.response.data.errors.forEach(err => {
          validationErrors[err.path] = err.msg;
        });
        setErrors(validationErrors);
      } else {
        setErrors({ 
          general: error.response?.data?.message || 
                  'Error al actualizar el usuario. Por favor intente nuevamente.' 
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Usuario</h2>
        
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        
        {errors.general && (
          <div className="error-message">{errors.general}</div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && (
              <span className="error">{errors.firstName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Apellido:</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            {errors.lastName && (
              <span className="error">{errors.lastName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled
            />
            {errors.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label>Nueva Contraseña:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              placeholder="Ingrese solo si desea cambiar la contraseña"
            />
            {!passwordChanged && (
              <div className="password-info">
                <small>La contraseña actual se mantendrá</small>
              </div>
            )}

          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {errors.phoneNumber && (
              <span className="error">{errors.phoneNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label>Rol:</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="Usuario">Usuario</option>
              <option value="Administrador">Administrador</option>
            </select>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label>Estado:</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
            {errors.status && (
              <span className="error">{errors.status}</span>
            )}
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="cancel-btn"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-btn"
            >
              {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}