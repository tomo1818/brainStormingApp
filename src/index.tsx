import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Box, ChakraProvider } from '@chakra-ui/react';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Nodes from './pages/Nodes';
import TestPage from './pages/TestPage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <ChakraProvider>
      <React.StrictMode>
        <AuthProvider>
          <UserProvider>
            <Box h="calc(100vh)">
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/test" element={<TestPage />} />
                <Route path="/room" element={<Nodes />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/mypage" element={<MyPage />} />
              </Routes>
            </Box>
          </UserProvider>
        </AuthProvider>
      </React.StrictMode>
    </ChakraProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
