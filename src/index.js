import { ChakraProvider } from '@chakra-ui/react';
import { render } from 'react-dom';
import App from './App';
import './index.css';


render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById('root')
);

