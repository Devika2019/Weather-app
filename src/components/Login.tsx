import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  //handle login event
  const handleLogin = () => {
    if (username.trim()) {
      dispatch(login(username));
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        background: 'linear-gradient(to bottom, #e3f2fd, #ffffff)' 
      }}
    >
      <Paper 
        elevation={10} 
        sx={{ 
          padding: 4, 
          maxWidth: 400, 
          borderRadius: 3, 
          textAlign: 'center', 
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.3)', 
          backgroundColor: '#ffffff',
          position: 'relative'
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ color: '#0277bd', fontWeight: 'bold', mb: 3 }}
        >
          Login
        </Typography>
        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ 
            marginBottom: 3, 
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#0277bd',
              },
              '&:hover fieldset': {
                borderColor: '#01579b',
              },
            },
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          sx={{ 
            width: '100%', 
            backgroundColor: '#0288d1', 
            '&:hover': { 
              backgroundColor: '#0277bd' 
            }, 
            padding: '10px 0',
            textTransform: 'none',
            borderRadius: '20px'
          }}
        >
          Login
        </Button>
        <Box 
          sx={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            background: 'linear-gradient(to top, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))', 
            borderRadius: 'inherit', 
            zIndex: -1 
          }}
        />
      </Paper>
    </Box>
  );
};

export default Login;
