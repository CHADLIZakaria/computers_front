import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import axios from 'axios';


render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);

