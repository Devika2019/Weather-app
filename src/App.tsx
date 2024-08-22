import React from 'react';
import { Container, Typography, Box, AppBar, Toolbar, IconButton, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './features/user/userSlice'; // Ensure correct import path
import { clearWeatherData } from './features/weather/weatherSlice'; // Import the action
import SearchInput from './components/SearchInput';
import WeatherDisplay from './components/WeatherDisplay';
import Login from './components/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Logout icon
import WbSunnyIcon from '@mui/icons-material/WbSunny'; 

const App: React.FC = () => {
  const username = useSelector((state: any) => state.user.username);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearWeatherData()); // Clear weather data on logout
    dispatch(logout()); // Dispatch logout action
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#0288d1' }}>
        <Toolbar>
        <WbSunnyIcon sx={{ color: '#FFD54F', fontSize: 30, marginRight: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
          {username && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" sx={{ color: '#ffffff', marginRight: 2 }}>
                Welcome, {username}
              </Typography>
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{ 
                  '&:hover': { backgroundColor: '#0277bd' },
                  borderRadius: '50%' 
                }}
                data-testid="logout-button">
                <ExitToAppIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ padding: 3 }}>
        <Box 
          sx={{ 
            textAlign: 'center', 
            marginY: 4, 
            paddingY: 4, 
            paddingX: 2, 
            backgroundColor: '#e3f2fd', 
            borderRadius: 4,
            boxShadow: 6,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Paper 
            elevation={10} 
            sx={{ 
              padding: 4, 
              borderRadius: 4, 
              backgroundColor: '#ffffff', 
              boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.15)', 
              position: 'relative'
            }}
          >
            {username ? (
              <>
                <SearchInput />
                <WeatherDisplay />
              </>
            ) : (
              <Login />
            )}
          </Paper>
          <Box 
            sx={{ 
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              height: '100px', 
              background: 'linear-gradient(to top, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%)',
              zIndex: -1 
            }}
          />
        </Box>
      </Container>
    </>
  );
};

export default App;
