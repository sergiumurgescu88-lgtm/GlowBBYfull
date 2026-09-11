import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Funcție pentru a verifica dacă token-ul a expirat
const isTokenExpired = (token) => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch (e) {
    return true; // Dacă nu putem parsa token-ul, îl considerăm expirat
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('glowbby_token');
    
    // Verificăm dacă token-ul stocat este valid
    if (storedToken) {
      if (isTokenExpired(storedToken)) {
        console.log('⚠️ Token expirat detectat, se șterge automat...');
        localStorage.removeItem('glowbby_token');
        setToken(null);
      } else {
        setToken(storedToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        try {
          const payload = JSON.parse(atob(storedToken.split('.')[1]));
          setUser({ id: payload.id, username: payload.username });
        } catch (e) {
          console.error('Eroare la parsarea token-ului:', e);
          localStorage.removeItem('glowbby_token');
          setToken(null);
        }
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ id: payload.id, username: payload.username });
      } catch (e) {
        setUser(null);
      }
    } else {
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  // Interceptor pentru a detecta erori 401/403 și a forța logout
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
          console.log('⚠️ Token invalid detectat, se forțează logout...');
          logout();
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

            const login = async (username, password) => {
    try {
      // Eliminăm orice spațiu accidental de la început sau sfârșit
      const cleanUsername = username.trim();
      const cleanPassword = password.trim();
      
      const res = await axios.post('/v1/auth/login', { username: cleanUsername, password: cleanPassword });
      const { token: t, user: u } = res.data;
      localStorage.setItem('glowbby_token', t);
      setToken(t);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.response?.data?.error || 'Credențiale incorecte. Verifică să nu ai spații.' };
    }
  };

  const logout = () => {
    localStorage.removeItem('glowbby_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
