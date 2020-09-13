import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'; 

const theme = createMuiTheme({
    palette: {
      primary: {
       main: '#000',
      },
      secondary: {
        main: '#2979ff',
      } 
    },
});

ReactDOM.render(  
    <BrowserRouter>
      <MuiThemeProvider theme = { theme }>
        <App />
      </MuiThemeProvider>
    </BrowserRouter>,
  document.getElementById('root')
);