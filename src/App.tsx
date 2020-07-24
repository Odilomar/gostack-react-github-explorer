import React, { FC } from 'react';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom';

import Global from './styles/global';

const App: FC = () => (
  <>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <Global />
  </>
);

export default App;
