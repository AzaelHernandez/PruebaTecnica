export default function UserFilters({ filters, onFilterChange }) {
    const handleChange = (e) => {
      const { name, value } = e.target;
      onFilterChange({ ...filters, [name]: value });
    };
  
    return (
      <div className="filters">
        <input
          type="text"
          name="search"
          placeholder="Buscar por nombre o email"
          value={filters.search}
          onChange={handleChange}
        />
        <select name="role" value={filters.role} onChange={handleChange}>
          <option value="">Todos los roles</option>
          <option value="Administrador">Administrador</option>
          <option value="Usuario">Usuario</option>
        </select>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">Todos los estados</option>
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
      </div>
    );
  }