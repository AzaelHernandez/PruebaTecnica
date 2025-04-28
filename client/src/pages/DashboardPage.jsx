import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/users/UserTable';
import UserFilters from '../components/users/UserFilters';
import AddUserForm from '../components/users/AddUserForm';
import EditUserForm from '../components/users/EditUserForm';
import api from '../services/api';
import '../styles/DashboardPage.css';

export default function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingUserId, setEditingUserId] = useState(null);
  const navigate = useNavigate();

  // Función para cargar los usuarios
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/users', {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          ...filters,
        },
      });
      setUsers(data.data);
      setPagination({
        ...pagination,
        total: data.pagination.total,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response?.status === 401) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  // Cargar usuarios cada vez que cambien los filtros o la página
  useEffect(() => {
    fetchUsers();
  }, [pagination.page, filters]);

  // Cambiar de página
  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, page: newPage });
  };

  // Eliminar usuario
  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await api.delete(`/users/${userId}`);
        setUsers(users.filter(user => user._id !== userId)); // Actualiza la lista de usuarios
        alert('Usuario eliminado correctamente');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Hubo un error al eliminar el usuario');
      }
    }
  };

  // Agregar un nuevo usuario
  const handleUserAdded = (newUser) => {
    setUsers([newUser, ...users]);
  };

  // Actualizar un usuario
  const handleUserUpdated = (updatedUser) => {
    setUsers(users.map(user => 
      user._id === updatedUser._id ? updatedUser : user
    ));
  };

  return (
    <div className="dashboard-container">
      <h1>Panel de Administración</h1>
      
      <div className="dashboard-controls">
        <button 
          onClick={() => setShowAddForm(true)}
          className="add-user-btn"
        >
          Agregar Usuario
        </button>
        
        <UserFilters 
          filters={filters}
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setPagination({ ...pagination, page: 1 });
          }}
        />
      </div>

      {loading ? (
        <div className="loading-spinner">Cargando usuarios...</div>
      ) : (
        <UserTable 
          users={users} 
          onEdit={setEditingUserId} 
          onDelete={handleDelete}  // Aquí pasamos la función handleDelete
        />
      )}

      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page === 1}
        >
          Anterior
        </button>
        <span>
          Página {pagination.page} de {Math.ceil(pagination.total / pagination.limit)}
        </span>
        <button
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page * pagination.limit >= pagination.total}
        >
          Siguiente
        </button>
      </div>

      {showAddForm && (
        <AddUserForm 
          onUserAdded={handleUserAdded}
          onClose={() => setShowAddForm(false)}
        />
      )}

      {editingUserId && (
        <EditUserForm
          userId={editingUserId}
          onUserUpdated={handleUserUpdated}
          onClose={() => setEditingUserId(null)}
        />
      )}
    </div>
  );
}
