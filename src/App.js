import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { Landing } from 'components/layouts';
import { Home } from 'pages';
import { Auth } from 'components/auth';
import { Dashboard, ProductManager, CategoryManager } from 'pages/admin';
import { UserRouting } from 'components/user';
import { PrivateRoute } from 'components/routing';

import 'css/common.scss';
import 'css/layout.scss';
import 'css/home.scss';
import 'css/auth.scss';
import 'css/product.scss';

function App() {
  return (
    <Provider store={store}>
      <UserRouting>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Auth />} />

            <Route exact path="/" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product-manager" element={<ProductManager />} />
              <Route path="/category-manager" element={<CategoryManager />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserRouting>
    </Provider>
  );
}

export default App;
