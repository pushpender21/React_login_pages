import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import AuthForm from './components/AuthForm';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import { useAuth } from './context/AuthContext';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<'auth' | 'profile'>('auth');

  // Auto-navigate to profile if user is logged in
  useEffect(() => {
    if (user && currentPage === 'auth') {
      setCurrentPage('profile');
    } else if (!user && currentPage === 'profile') {
      setCurrentPage('auth');
    }
  }, [user, currentPage]);

  const handleNavigate = (page: 'auth' | 'profile') => {
    setCurrentPage(page);
  };

  const handleNavigateToProfile = () => {
    setCurrentPage('profile');
  };

  const handleNavigateToAuth = () => {
    setCurrentPage('auth');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        currentPage={currentPage} 
        onNavigate={handleNavigate}
      />
      
      <main>
        {currentPage === 'auth' ? (
          <AuthForm onNavigateToProfile={handleNavigateToProfile} />
        ) : (
          <Profile onNavigateToAuth={handleNavigateToAuth} />
        )}
      </main>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;