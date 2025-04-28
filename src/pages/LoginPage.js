import React, { useState } from 'react';
import { 
  Container, 
  Box, 
  Paper, 
  Typography, 
  TextField, 
  Button, 
  Link, 
  Alert,
  InputAdornment,
  IconButton,
  Avatar
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import HotelIcon from '@mui/icons-material/Hotel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage = ({ login }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Form validation
    if (!email) {
      setError('Пожалуйста, введите email');
      return;
    }
    if (!password) {
      setError('Пожалуйста, введите пароль');
      return;
    }

    // Attempt to login
    const success = login(email, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Неверный email или пароль');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  // Demo login for testing
  const handleDemoLogin = () => {
    const demoEmail = 'demo@example.com';
    const demoPassword = 'password123';
    
    setEmail(demoEmail);
    setPassword(demoPassword);
    
    const success = login(demoEmail, demoPassword);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        bgcolor: 'background.default',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: 'linear-gradient(120deg, rgba(224,247,250,0.8) 0%, rgba(245,245,245,0.8) 100%)',
        py: 4
      }}
    >
      <Container maxWidth="sm">
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'inline-flex', alignItems: 'center' }}>
            <HotelIcon sx={{ mr: 1, fontSize: 30, color: 'primary.main' }} />
            <Typography variant="h5" component="div" sx={{ fontWeight: 600, color: 'primary.main' }}>
              Wyndham Garden Astana
            </Typography>
          </RouterLink>
        </Box>
        
        <Paper 
          elevation={0} 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'primary.main', width: 56, height: 56 }}>
              <HotelIcon fontSize="large" />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ fontWeight: 600 }}>
              Вход в систему
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              Войдите в свою учетную запись для доступа к дашборду
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              size="large"
            >
              Войти
            </Button>

            <Button
              fullWidth
              variant="outlined"
              sx={{ mb: 3, py: 1.5 }}
              size="large"
              onClick={handleDemoLogin}
            >
              Демо-доступ
            </Button>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
              <Link component={RouterLink} to="/register" variant="body2" sx={{ color: 'primary.main' }}>
                {"Нет аккаунта? Зарегистрируйтесь"}
              </Link>
              <Link href="#" variant="body2" sx={{ color: 'text.secondary' }}>
                Забыли пароль?
              </Link>
            </Box>
          </Box>
        </Paper>
        
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Wyndham Garden Astana Dashboard
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LoginPage; 