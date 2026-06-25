import {useCallback} from "react";
import { Navigate, Outlet } from 'react-router-dom';

import Sidebar from "../Layout/Sidebar.tsx";
import TopBar from "../Layout/TopBar.tsx";

interface ProtectedRouteProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

export default function ProtectedRoute({isSidebarOpen, setIsSidebarOpen}: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const toggleSidebar = useCallback(() =>
            setIsSidebarOpen(!isSidebarOpen),
        [isSidebarOpen, setIsSidebarOpen]
    );

  return token ?
              <div className="xl:ml-64 transition-all duration-300">
                  <TopBar onMenuClick={toggleSidebar}/>
                  <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)}/>
                  <Outlet/>
              </div>
              :
              <Navigate to="/login" replace/>
}
