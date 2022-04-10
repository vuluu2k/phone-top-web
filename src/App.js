import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store';
import { Landing } from 'components/layouts';
import { Home, Account } from 'pages';
import { Auth } from 'components/auth';
import { Dashboard, ProductManager, CategoryManager, PackageManager } from 'pages/admin';
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
            <Route path="/account" element={<Account />} />
            <Route path="/login" element={<Auth />} />

            <Route exact path="/" element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/product-manager" element={<ProductManager />} />
              <Route path="/category-manager" element={<CategoryManager />} />
              <Route path="/package-manager" element={<PackageManager />} />
              <Route path="/blog-manager" element={<CategoryManager />} />
              <Route path="/account-manager" element={<CategoryManager />} />
            </Route>
            <Route path="/*" element={<div>Địa chỉ trang không tồn tại trên trang web</div>} />
          </Routes>
        </BrowserRouter>
      </UserRouting>
    </Provider>
  );
}

export default App;
