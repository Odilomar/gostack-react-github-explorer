import React, { FC } from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

const App: FC = () => (
  <BrowserRouter>
    <Routes />
  </BrowserRouter>
);

export default App;
