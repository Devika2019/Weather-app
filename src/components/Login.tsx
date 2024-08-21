import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
 const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login(username));
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '20px auto', textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <TextField
        fullWidth
        label="Username"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;