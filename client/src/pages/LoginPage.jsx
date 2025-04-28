import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

  export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]); // Cambiamos a array para múltiples errores
    const { login } = useAuth();

    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrors([]); // Limpiamos errores anteriores
      
      try {
        await login(email, password);
      } catch (err) {
        // Dividimos el mensaje por saltos de línea si hay múltiples errores
        setErrors(err.message.split('\n'));
      }
    };

      return (
        <div className="login-container">
          <h1>Inicio de sesión</h1>
          
          {/* Mostramos todos los errores */}
          {errors.length > 0 && (
            <div className="error-alert">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
            <button type="submit">Ingresar</button>
          </form>
        </div>
      );
    }