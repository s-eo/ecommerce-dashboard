import { Bell, Moon, Sun, Menu } from 'lucide-react';
import { useTheme } from '../Theme/ThemeContext';
import { useLocation } from 'react-router-dom';
import { useUser } from '../../User/UserContext';
import Logo from "./Logo.tsx";

interface TopBarProps {
  onMenuClick: () => void;
  withLogo?: boolean;
}

const pathNames: Record<string, string> = {
  '/': 'Dashboard',
  '/products': 'Products',
  '/product/new': 'Create new product',
  '/orders': 'Orders',
  '/order/new': 'Create New Order',
  '/customers': 'Customers',
  '/users': 'Users',
  '/analytics': 'Analytics',
  '/marketing': 'Marketing',
  '/settings': 'Settings',
};

export default function TopBar({ onMenuClick, withLogo = false }: TopBarProps) {
  const { actualTheme, setTheme } = useTheme();
  const location = useLocation();
  const currentPath = pathNames[location.pathname] || '';
  const { user } = useUser();

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <header className={`h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 fixed left-0 right-0 top-0 z-10 ${withLogo ? '' : 'xl:left-64'}`}>
      {withLogo ? <Logo /> : (
          <div className="flex items-center gap-4">
            <button
                onClick={onMenuClick}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors xl:hidden cursor-pointer"
            >
              <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400"/>
            </button>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{currentPath}</h2>
          </div>
      )}

      {/* Right side - Actions */}
      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <button
            onClick={() => setTheme(actualTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle theme"
        >
          {actualTheme === 'dark' ? (
            <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          )}
        </button>

        {/* Notifications */}
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors relative">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        {user &&
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-800">
              <div
                  className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(user.name)}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user.role}</p>
              </div>
            </div>
        }
      </div>
    </header>
  );
}
