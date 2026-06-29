import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { UserProvider } from './components/User/UserProvider';
import { NotificationProvider } from './components/Notification/NotificationProvider';
import { Notification } from './components/Notification/Notification';
import ProtectedRoute from './components/CustomRoutes/ProtectedRoute.tsx';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Users from './pages/Users';
import Analytics from './pages/Analytics';
import Marketing from './pages/Marketing';
import Settings from './pages/Settings';
import NewProduct from './pages/NewProduct';
import NewOrder from './pages/NewOrder';
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary.tsx";
import AnAuthRoute from "./components/CustomRoutes/AnAuthRoute.tsx";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
      <BrowserRouter>
        <NotificationProvider>
          <UserProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
              <Notification />
              <Routes>
                <Route element={<AnAuthRoute />}>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/signup" element={<Signup/>}/>
                </Route>
                <Route element={<ProtectedRoute
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                />}>
                  <Route path="/" element={<Dashboard/>} ErrorBoundary={ErrorBoundary}/>
                  <Route path="/products" element={<Products/>}/>
                  <Route path="/product/new" element={<NewProduct/>}/>
                  <Route path="/orders" element={<Orders/>}/>
                  <Route path="/order/new" element={<NewOrder/>}/>
                  <Route path="/customers" element={<Customers/>}/>
                  <Route path="/users" element={<Users/>}/>
                  <Route path="/analytics" element={<Analytics/>}/>
                  <Route path="/marketing" element={<Marketing/>}/>
                  <Route path="/settings" element={<Settings/>}/>
                </Route>
              </Routes>
            </div>
          </UserProvider>
        </NotificationProvider>
      </BrowserRouter>
  );
}

export default App
