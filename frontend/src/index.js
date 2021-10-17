import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react';
import '@fontsource/poppins/400.css'
import '@fontsource/source-sans-pro/700.css'
import App from './App'
import theme from './theme'
import store from './services/store'

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ChakraProvider>,
    document.getElementById('root')
);
