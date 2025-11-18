import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCalendar, FiMessageSquare, FiPackage, FiPlus, FiClock } from 'react-icons/fi';
import AppointmentList from '../components/AppointmentList';
import UserProfileCard from '../components/UserProfileCard';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        console.log('Stored user:', storedUser);
        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            console.log('Parsed user:', parsedUser);
            setUser(parsedUser);
          } catch (parseError) {
            console.error('Error parsing user data:', parseError);
            localStorage.removeItem('user');
            navigate('/login');
          }
        } else {
          console.log('No user found in localStorage, redirecting to login');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error in Dashboard useEffect:', error);
        setError('Failed to load dashboard. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center bg-white p-6 rounded-lg shadow-md max-w-md w-full">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-600">Please log in to view your dashboard</p>
          <button 
            onClick={() => navigate('/login')} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-semibold text-gray-900">Health Dashboard</h1>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
              {user?.role === 'doctor' ? 'Doctor' : 'Patient'} Account
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long',
              month: 'long',
              day: 'numeric' 
            })}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg mb-6 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Welcome back, {user?.name?.split(' ')[0] || 'User'}!
          </h2>
          <p className="text-gray-600">Here's what's happening with your health today</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white shadow rounded-lg p-6">
              <UserProfileCard user={user} />
            </div>
            
            {/* Quick Actions */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { 
                    icon: <FiCalendar className="w-5 h-5 mr-3" />,
                    label: 'Book Appointment',
                    color: 'blue',
                    onClick: () => navigate('/appointment-form')
                  },
                  { 
                    icon: <FiMessageSquare className="w-5 h-5 mr-3" />,
                    label: 'Chat with Doctors',
                    color: 'green',
                    onClick: () => navigate('/doctors-consultation')
                  },
                  { 
                    icon: <FiPackage className="w-5 h-5 mr-3" />,
                    label: 'Order Medicine',
                    color: 'purple',
                    onClick: () => navigate('/order-medicine')
                  }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="w-full flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-50 rounded"
                  >
                    {action.icon}
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Column */}
          <div className="md:col-span-2 space-y-6">
            {/* Appointments */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
              </div>
              <div className="p-4">
                <AppointmentList userId={user?._id} />
              </div>
            </div>

            {/* Health Summary */}
            <div className="bg-white shadow rounded-lg">
              <div className="px-6 py-4 border-b">
                <h3 className="text-lg font-medium text-gray-900">Health Summary</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-blue-600 font-medium">Next Checkup</p>
                      <p className="text-lg font-semibold">
                        {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <FiCalendar className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-green-600 font-medium">Last Visit</p>
                      <p className="text-lg font-semibold">
                        {new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <FiClock className="w-6 h-6 text-green-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
