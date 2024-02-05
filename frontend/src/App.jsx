import React, { useEffect } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { Register } from './components/Auth/Register';
import { AuthConsumer, AuthProvider } from './context/JWTAuthContext';
import { Flex, Spinner, Box } from '@chakra-ui/react';
import { PublicRoute } from './components/Auth/PublicRoute';
import { Authenticated } from './components/Auth/Authenticated';
import { Jobs } from './pages/Jobs';
import { Navbar } from './components/Navbar/Navbar';
import { Sidebar } from './components/Sidebar/Sidebar';
import { Statistics } from './pages/Statistics';
import { Profile } from './pages/Profile';



const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <AuthConsumer>
            {(auth) =>
              !auth.isInitialized ? (
                <Flex
                  height="100vh"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Spinner
                    thickness="4xp"
                    speed="0.65s"
                    emptyColor="green.200"
                    color="green.500"
                    size="xl"
                  />
                </Flex>
              ) : (
                <Routes>
                  <Route path="/login" element={<PublicRoute><Login /></PublicRoute>}/>
                  <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}/>
                  
                  <Route path="/" element={<Authenticated><Flex><Sidebar />
                  <Box flex="1" ><Navbar /><Jobs /></Box></Flex></Authenticated>}/>
                  
                  <Route path="/statistics" element={<Authenticated><Flex><Sidebar />
                  <Box flex="1" ><Navbar /><Statistics /></Box></Flex></Authenticated>}/>
                  
                  <Route path="/profile" element={<Authenticated><Flex><Sidebar />
                  <Box flex="1" ><Navbar /><Profile /></Box></Flex></Authenticated>}/>
                  
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              )
            }
          </AuthConsumer>
        </Router>
      </AuthProvider>
    </>
  );
};

export default App;
