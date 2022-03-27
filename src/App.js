import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { Landing } from 'components/layouts';
import { Home } from 'pages';
import { Auth } from 'components/auth';

import 'css/common.scss';
import 'css/layout.scss';
import 'css/home.scss';
import 'css/auth.scss';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/account" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
