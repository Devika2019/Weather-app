import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useSelector,useDispatch } from 'react-redux';
import { logout } from './features/user/userSlice';
import SearchInput from './components/SearchInput';
 import WeatherDisplay from './components/WeatherDisplay';
import Login from './components/Login';

const App: React.FC = () => {
  const username = useSelector((state:any) => state.user.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <Box sx={{ textAlign: 'center', marginBottom: 4 }}>
        <Typography variant="h3" gutterBottom>Weather App</Typography>
        {username ? (
          <>
            <Typography variant="h6">Welcome, {username}!</Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleLogout}
              sx={{ marginBottom: 2 }}
            >
              Logout
            </Button>
            <SearchInput />
            <WeatherDisplay />
          </>
        ) : (
          <Login />
        )}
      </Box>
    </Container>
  );
};

export default App;