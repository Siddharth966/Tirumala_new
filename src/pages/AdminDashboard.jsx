import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  Settings,
  LogOut,
  Plus,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'admin') {
      alert('Access Denied. Admins only.');
      navigate('/');
      return;
    }

    setUser(parsedUser);
  }, [navigate]);

  // Lifted state for shared data
  const [usersCount, setUsersCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        // We can just fetch users to count them for now
        const res = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { 'x-auth-token': token }
        });
        setUsersCount(res.data.length);
      } catch (err) {
        console.error("Error fetching stats");
      }
    }
    if (user) fetchStats();
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview usersCount={usersCount} />;
      case 'users':
        return <UsersManagement />;
      case 'products':
        return <ProductsManagement />;
      case 'consultations':
        return <ConsultationsManager />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden text-white">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="fixed inset-y-0 left-0 w-64 bg-green-900 border-r border-green-800 shadow-2xl flex flex-col transition-transform duration-300">
            <div className="flex items-center justify-between h-16 px-6 border-b border-green-800">
              <h1 className="text-xl font-bold tracking-wider">Tirumala Admin</h1>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-green-800 rounded">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-6">
              <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} />
              <SidebarItem icon={Users} label="Users" active={activeTab === 'users'} onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }} />
              <SidebarItem icon={Package} label="Products" active={activeTab === 'products'} onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }} />
              <SidebarItem icon={Users} label="Consultations" active={activeTab === 'consultations'} onClick={() => { setActiveTab('consultations'); setMobileMenuOpen(false); }} />
              <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }} />
            </nav>
            <div className="p-4 border-t border-green-800">
              <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-red-300 hover:bg-green-800 rounded-lg">
                <LogOut className="h-5 w-5 mr-3" /> Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-green-900 text-white transition-all duration-300 z-30 hidden lg:block">
        <div className="flex items-center justify-center h-16 border-b border-green-800">
          <h1 className="text-2xl font-bold tracking-wider">Tirumala Admin</h1>
        </div>
        <nav className="mt-8 px-4 space-y-2">
          <SidebarItem
            icon={LayoutDashboard}
            label="Overview"
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          />
          <SidebarItem
            icon={Users}
            label="Users"
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
          />
          <SidebarItem
            icon={Package}
            label="Products"
            active={activeTab === 'products'}
            onClick={() => setActiveTab('products')}
          />
          <SidebarItem
            icon={Users}
            label="Consultations"
            active={activeTab === 'consultations'}
            onClick={() => setActiveTab('consultations')}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-green-800">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-red-300 hover:bg-green-800 rounded-lg transition-colors"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-20">
          <div className="flex items-center text-gray-800">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden mr-4 p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-semibold capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-full focus:ring-2 focus:ring-green-500 w-64 transition-all"
              />
            </div>
            <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full">
              <Bell className="h-6 w-6" />
              <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center space-x-3 border-l pl-6">
              <div className="h-10 w-10 bg-green-200 rounded-full flex items-center justify-center text-green-700 font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 flex-grow">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Sub-components
const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${active
      ? 'bg-green-700 text-white shadow-md'
      : 'text-green-100 hover:bg-green-800 hover:text-white'
      }`}
  >
    <Icon className="h-5 w-5 mr-3" />
    <span className="font-medium">{label}</span>
  </button>
);

const DashboardOverview = ({ usersCount }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Revenue" value="$45,231" change="+20.1%" type="positive" icon={ShoppingCart} />
      <StatCard title="Active Users" value={usersCount} change="+15.2%" type="positive" icon={Users} />
      <StatCard title="New Orders" value="1,244" change="-5%" type="negative" icon={Package} />
      <StatCard title="Pending Items" value="12" change="+2%" type="neutral" icon={LayoutDashboard} />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-4">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">New User Registered</p>
                  <p className="text-sm text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">View</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-800 mb-4">System Status</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span>Server Load</span>
            <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-bold">Normal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '45%' }}></div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <span>Database Usage</span>
            <span className="text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-xs font-bold">Warning</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/auth/users', {
          headers: { 'x-auth-token': token }
        });
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching users", err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Registered Users</h3>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Plus className="h-4 w-4 mr-2" /> Add User
        </button>
      </div>

      {loading ? (
        <div className="p-12 flex justify-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mr-3"></div>
          Loading users...
        </div>
      ) : users.length === 0 ? (
        <div className="p-12 text-center text-gray-500">
          <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>No users found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm">
                <th className="px-6 py-3 font-semibold">Name</th>
                <th className="px-6 py-3 font-semibold">Email</th>
                <th className="px-6 py-3 font-semibold">Role</th>
                <th className="px-6 py-3 font-semibold">Joined At</th>
                <th className="px-6 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold mr-3">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-gray-400 hover:text-green-600 mr-3">Edit</button>
                    <button className="text-gray-400 hover:text-red-500">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tractor',
    price: '',
    image: 'bg-green-100' // Default color
  });

  const categories = ['Tractor', 'Implements', 'Harvester', 'Sowing'];
  const colors = [
    { name: 'Green', value: 'bg-green-100' },
    { name: 'Orange', value: 'bg-orange-100' },
    { name: 'Yellow', value: 'bg-yellow-100' },
    { name: 'Red', value: 'bg-red-100' },
    { name: 'Blue', value: 'bg-blue-100' },
    { name: 'Purple', value: 'bg-purple-100' },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products", err);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      setShowForm(false);
      setFormData({ name: '', category: 'Tractor', price: '', image: 'bg-green-100' });
      fetchProducts();
    } catch (err) {
      console.error("Error adding product", err);
      alert("Failed to add product");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`http://localhost:5000/api/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Product Inventory</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {showForm ? <LogOut className="h-4 w-4 mr-2 rotate-180" /> : <Plus className="h-4 w-4 mr-2" />}
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {showForm && (
          <div className="p-6 bg-green-50 border-b border-green-100 animate-in fade-in slide-in-from-top-4">
            <h4 className="font-bold text-green-800 mb-4">Add New Product</h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. John Deere 5310"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Structure</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. ₹800/hr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL or Color Class</label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g. /images/tractor.png or bg-green-100"
                />
                <p className="text-xs text-gray-500 mt-1">Accepts local paths, http URLs, or Tailwind bg classes.</p>
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition shadow-lg shadow-green-200"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="p-12 flex justify-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mr-3"></div>
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No products found. Add some!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="px-6 py-3 font-semibold">Product</th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Price</th>
                  <th className="px-6 py-3 font-semibold">Theme</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-bold uppercase tracking-wider">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.price}</td>
                    <td className="px-6 py-4">
                      <div className="h-10 w-16 rounded overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center">
                        {product.image && (product.image.startsWith('/') || product.image.startsWith('http')) ? (
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className={`w-full h-full ${product.image || 'bg-gray-200'}`}></div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const ConsultationsManager = () => {
  const [meetings, setMeetings] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    userId: '',
    specialistName: 'Dr. Ramesh Gupta',
    date: '',
    time: '',
    topic: '',
    meetLink: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [meetingsRes, usersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/meetings'),
        axios.get('http://localhost:5000/api/auth/users', {
          headers: { 'x-auth-token': token }
        })
      ]);
      setMeetings(meetingsRes.data);
      setUsers(usersRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data", err);
      // If auth fails, we might just have empty users, which is better than crashing
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/meetings', formData);
      setShowForm(false);
      setFormData({
        userId: '',
        specialistName: 'Dr. Ramesh Gupta',
        date: '',
        time: '',
        topic: '',
        meetLink: ''
      });
      fetchData();
      alert('Meeting Scheduled Successfully');
    } catch (err) {
      console.error("Error scheduling meeting", err);
      alert("Failed to schedule meeting");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Cancel this meeting?')) {
      try {
        await axios.delete(`http://localhost:5000/api/meetings/${id}`);
        fetchData();
      } catch (err) {
        console.error("Error deleting meeting", err);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Expert Consultations</h3>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            {showForm ? <LogOut className="h-4 w-4 mr-2 rotate-180" /> : <Plus className="h-4 w-4 mr-2" />}
            {showForm ? 'Cancel' : 'Schedule Meeting'}
          </button>
        </div>

        {showForm && (
          <div className="p-6 bg-green-50 border-b border-green-100 animate-in fade-in slide-in-from-top-4">
            <h4 className="font-bold text-green-800 mb-4">Schedule New Session</h4>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Farmer</label>
                <select
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                >
                  <option value="">-- Select Users --</option>
                  {users.map(u => (
                    <option key={u._id} value={u._id}>{u.name} ({u.email})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialist Name</label>
                <select
                  name="specialistName"
                  value={formData.specialistName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                >
                  <option value="Dr. Ramesh Gupta">Dr. Ramesh Gupta (Soil)</option>
                  <option value="Priya Sharma">Priya Sharma (Pathology)</option>
                  <option value="Dr. Anita Desai">Dr. Anita Desai (Entomology)</option>
                  <option value="Kishan Kumar">Kishan Kumar (Agri-Business)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Issue</label>
                <input
                  type="text"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Yellowing of tomato leaves"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div className="md:col-span-2 flex justify-end mt-2">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition"
                >
                  Confirm Schedule
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="p-12 flex justify-center text-gray-500">Loading schedules...</div>
        ) : meetings.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No upcoming meetings scheduled.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="px-6 py-3 font-semibold">Farmer</th>
                  <th className="px-6 py-3 font-semibold">Specialist</th>
                  <th className="px-6 py-3 font-semibold">Date & Time</th>
                  <th className="px-6 py-3 font-semibold">Topic</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {meetings.map((meeting) => (
                  <tr key={meeting._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {meeting.userId ? meeting.userId.name : 'Unknown'}
                    </td>
                    <td className="px-6 py-4 text-green-700 font-medium">{meeting.specialistName}</td>
                    <td className="px-6 py-4">
                      {meeting.date} at {meeting.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{meeting.topic}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(meeting._id)}
                        className="text-red-500 hover:text-red-700 font-medium text-sm"
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const SettingsView = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-bold text-gray-800 mb-6">System Settings</h3>
    <p>Settings configuration panel.</p>
  </div>
);

const StatCard = ({ title, value, change, type, icon: Icon }) => {
  const isPositive = type === 'positive';
  const isNeutral = type === 'neutral';

  let changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  if (isNeutral) changeColor = 'text-gray-600';

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h4 className="text-2xl font-bold text-gray-800 mt-1">{value}</h4>
        </div>
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`font-medium ${changeColor}`}>{change}</span>
        <span className="text-gray-400 ml-2">vs last month</span>
      </div>
    </div>
  );
};

export default AdminDashboard;
