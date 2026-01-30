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
  X,
  MessageSquare,
  Trash2,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import SuccessModal from '../components/SuccessModal';
import ConfirmModal from '../components/ConfirmModal';

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
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    messages: 0,
    meetings: 0,
    recentActivity: []
  });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { 'x-auth-token': token } };

        const [usersRes, productsRes, messagesRes, meetingsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/auth/users', config),
          axios.get('http://localhost:5000/api/products'),
          axios.get('http://localhost:5000/api/contacts'),
          axios.get('http://localhost:5000/api/meetings')
        ]);

        // Aggregate recent activity (Limiting users to last 3 as requested)
        const combined = [
          ...usersRes.data.slice(0, 3).map(u => ({ id: u._id, type: 'user', title: `New Farmer: ${u.name}`, time: u.createdAt })),
          ...messagesRes.data.slice(0, 3).map(m => ({ id: m._id, type: 'message', title: `Message from ${m.name}`, time: m.createdAt })),
          ...meetingsRes.data.slice(0, 3).map(mt => ({ id: mt._id, type: 'meeting', title: `Meeting with ${mt.userId?.name || 'Farmer'}`, time: mt.createdAt || new Date() }))
        ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

        setStats({
          users: usersRes.data.length,
          products: productsRes.data.length,
          messages: messagesRes.data.length,
          meetings: meetingsRes.data.length,
          recentActivity: combined
        });
      } catch (err) {
        console.error("Error fetching dashboard stats", err);
      } finally {
        setStatsLoading(false);
      }
    }
    if (user) fetchStats();
  }, [user, activeTab]); // Refresh stats when switching tabs too

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
        return <DashboardOverview stats={stats} loading={statsLoading} />;
      case 'users':
        return <UsersManagement />;
      case 'products':
        return <ProductsManagement />;
      case 'consultations':
        return <ConsultationsManager />;
      case 'messages':
        return <MessagesManagement />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardOverview stats={stats} loading={statsLoading} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden text-white">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
          <aside className="fixed inset-y-0 left-0 w-64 bg-green-600 border-r border-green-500 shadow-2xl flex flex-col transition-transform duration-300">
            <div className="flex items-center justify-between h-16 px-6 border-b border-green-500">
              <h1 className="text-xl font-bold tracking-wider">Tirumala Admin</h1>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-green-500 rounded">
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex-1 px-4 space-y-2 mt-6">
              <SidebarItem icon={LayoutDashboard} label="Overview" active={activeTab === 'dashboard'} onClick={() => { setActiveTab('dashboard'); setMobileMenuOpen(false); }} />
              <SidebarItem icon={Users} label="Users" active={activeTab === 'users'} onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }} />
              <SidebarItem icon={Package} label="Products" active={activeTab === 'products'} onClick={() => { setActiveTab('products'); setMobileMenuOpen(false); }} />
              <SidebarItem icon={Users} label="Consultations" active={activeTab === 'consultations'} onClick={() => { setActiveTab('consultations'); setMobileMenuOpen(false); }} />
              <SidebarItem icon={MessageSquare} label="Messages" active={activeTab === 'messages'} onClick={() => { setActiveTab('messages'); setMobileMenuOpen(false); }} />
              <SidebarItem icon={Settings} label="Settings" active={activeTab === 'settings'} onClick={() => { setActiveTab('settings'); setMobileMenuOpen(false); }} />
            </nav>
            <div className="p-4 border-t border-green-500">
              <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-green-100 hover:bg-green-500 rounded-lg">
                <LogOut className="h-5 w-5 mr-3" /> Logout
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-green-600 text-white transition-all duration-300 z-30 hidden lg:block">
        <div className="flex items-center justify-center h-16 border-b border-green-500">
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
            icon={MessageSquare}
            label="Messages"
            active={activeTab === 'messages'}
            onClick={() => setActiveTab('messages')}
          />
          <SidebarItem
            icon={Settings}
            label="Settings"
            active={activeTab === 'settings'}
            onClick={() => setActiveTab('settings')}
          />
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-green-500">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-2 text-green-100 hover:bg-green-500 rounded-lg transition-colors"
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
        <main className="p-8 flex-grow relative overflow-hidden bg-transparent">
          <div className="relative z-10">
            {renderContent()}
          </div>
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
      ? 'bg-green-800 text-white shadow-md'
      : 'text-green-50 hover:bg-green-500 hover:text-white'
      }`}
  >
    <Icon className="h-5 w-5 mr-3" />
    <span className="font-medium">{label}</span>
  </button>
);

const DashboardOverview = ({ stats, loading }) => {
  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Registered Farmers" value={stats.users} change="+12.5%" type="positive" icon={Users} />
        <ProductStatCard title="Machinery Items" value={stats.products} change="In Inventory" type="neutral" icon={Package} />
        <StatCard title="Consultations" value={stats.meetings} change="Scheduled" type="positive" icon={LayoutDashboard} />
        <StatCard title="Messages" value={stats.messages} change="Inquiries" type="neutral" icon={MessageSquare} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {stats.recentActivity.length > 0 ? (
              stats.recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex items-center">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center mr-4 ${activity.type === 'user' ? 'bg-blue-100 text-blue-600' :
                      activity.type === 'message' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                      {activity.type === 'user' ? <Users size={18} /> :
                        activity.type === 'message' ? <MessageSquare size={18} /> : <LayoutDashboard size={18} />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.title}</p>
                      <p className="text-xs text-gray-500">{new Date(activity.time).toLocaleString()}</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full uppercase font-bold text-gray-400">
                    {activity.type}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-gray-400">No recent activity detected.</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Operations Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Database Sync</span>
              <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs font-bold">Connected</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '100%' }}></div>
            </div>

            <div className="flex justify-between items-center mt-4">
              <span>Farmer Inquiry Growth</span>
              <span className="text-blue-600 bg-blue-100 px-2 py-1 rounded text-xs font-bold">Active</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit for base64 storage
        alert("Image is too large. Please select a file smaller than 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', formData);
      setShowForm(false);
      setFormData({ name: '', category: 'Tractor', price: '', image: 'bg-green-100' });
      fetchProducts();
      setModalContent({ title: 'Product Added!', message: 'The machinery has been successfully added to the inventory.' });
      setModalOpen(true);
    } catch (err) {
      console.error("Error adding product", err);
      alert("Failed to add product");
    }
  };

  const initiateDelete = (id) => {
    setItemToDelete(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${itemToDelete}`);
      fetchProducts();
      setItemToDelete(null);
      setModalContent({ title: 'Product Deleted', message: 'The item has been removed from the catalog.' });
      setModalOpen(true);
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  const imagePresets = {
    Tractor: 'https://images.unsplash.com/photo-1594142416040-52e008df48af?q=80&w=2670&auto=format&fit=crop',
    Harvester: 'https://images.unsplash.com/photo-1594142416040-52e008df48af?q=80&w=2670&auto=format&fit=crop',
    Implement: 'https://images.unsplash.com/photo-1464639351491-a172c2aa2911?q=80&w=2574&auto=format&fit=crop',
    Other: 'https://images.unsplash.com/photo-1530906358829-e84b2769270f?q=80&w=2573&auto=format&fit=crop'
  };

  return (
    <div className="space-y-6">
      <SuccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Product?"
        message="This will permanently remove this machinery from the inventory. This action cannot be undone."
        confirmText="Remove Item"
      />
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
          <div className="p-8 bg-slate-50 border-b border-gray-200 animate-in fade-in slide-in-from-top-4">
            <div className="grid lg:grid-cols-12 gap-12">

              {/* Form Side */}
              <div className="lg:col-span-7">
                <h4 className="font-bold text-slate-900 text-xl mb-6">New Product Details</h4>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all"
                        placeholder="e.g. John Deere 5310"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Price Structure</label>
                      <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all"
                        placeholder="e.g. ₹800/hr"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 text-green-600">Quick Image Select</label>
                      <div className="flex gap-2">
                        {Object.keys(imagePresets).map((key) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => setFormData({ ...formData, image: imagePresets[key] })}
                            className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-500 hover:border-green-500 hover:text-green-600 transition-all uppercase tracking-tighter"
                          >
                            {key}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>


                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-2">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Upload from Device</label>
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-green-500 hover:bg-green-50/50 transition-all group">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 text-slate-400 group-hover:text-green-600 mb-2 transition-colors" />
                          <p className="text-[10px] text-slate-500 group-hover:text-green-700 font-bold">CLICK TO UPLOAD</p>
                        </div>
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                      </label>
                    </div>
                    <div className="flex flex-col justify-end">
                      <p className="text-[10px] text-slate-400 mb-4 leading-relaxed bg-slate-100 p-3 rounded-xl border border-slate-200">
                        <span className="font-bold text-slate-500">PRO TIP:</span> Select a local image or use the presets below for instant high-quality visuals.
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="px-10 py-4 bg-green-700 text-white font-bold rounded-2xl hover:bg-green-800 transition shadow-xl shadow-green-900/20 active:scale-95"
                    >
                      Add to Inventory
                    </button>
                  </div>
                </form>
              </div>

              {/* Preview Side */}
              <div className="lg:col-span-5 flex flex-col justify-center border-l lg:pl-12 border-slate-200">
                <h4 className="font-bold text-slate-400 text-xs uppercase tracking-[0.2em] mb-8 text-center">Card Live Preview</h4>
                <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 max-w-sm mx-auto w-full group transition-all duration-500 hover:-translate-y-2">
                  <div className="h-48 relative overflow-hidden bg-slate-50">
                    {formData.image && (formData.image.startsWith('/') || formData.image.startsWith('http') || formData.image.startsWith('data:')) ? (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className={`w-full h-full flex items-center justify-center ${formData.image || 'bg-slate-200'}`}>
                        <div className="text-slate-400 font-black text-4xl opacity-20 uppercase -rotate-12 italic">Preview</div>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 text-[10px] font-extrabold text-white bg-green-600/80 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-widest">
                      Preview
                    </span>
                  </div>
                  <div className="p-8">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-bold text-green-600 uppercase tracking-[0.1em] bg-green-100/50 px-3 py-1 rounded-full">
                        {formData.category || 'Category'}
                      </span>
                      <span className="font-black text-xl text-slate-900">{formData.price || '₹0.00'}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-6">{formData.name || 'Equipment Name'}</h3>
                    <div className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl text-center">
                      Example Action
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-slate-400 mt-8 italic font-medium">This is exactly how farmers will see your equipment.</p>
              </div>

            </div>
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
                        {product.image && (product.image.startsWith('/') || product.image.startsWith('http') || product.image.startsWith('data:')) ? (
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className={`w-full h-full ${product.image || 'bg-gray-200'}`}></div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => initiateDelete(product._id)}
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
    specialistName: 'Dr.Ramesh Gupta',
    date: '',
    time: '',
    topic: '',
    meetLink: ''
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
      setModalContent({ title: 'Session Scheduled', message: 'The expert consultation has been successfully booked.' });
      setModalOpen(true);
    } catch (err) {
      console.error("Error scheduling meeting", err);
      alert("Failed to schedule meeting");
    }
  };

  const initiateDelete = (id) => {
    setItemToDelete(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/meetings/${itemToDelete}`);
      fetchData();
      setItemToDelete(null);
      setModalContent({ title: 'Meeting Cancelled', message: 'The consultation session has been removed.' });
      setModalOpen(true);
    } catch (err) {
      console.error("Error deleting meeting", err);
    }
  };

  return (
    <div className="space-y-6">
      <SuccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Cancel Meeting?"
        message="Are you sure you want to cancel this consultation session? This will alert the user."
        confirmText="Cancel Meeting"
      />
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
                        onClick={() => initiateDelete(meeting._id)}
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

const MessagesManagement = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', message: '' });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contacts');
      setMessages(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching messages", err);
      setLoading(false);
    }
  };

  const initiateDelete = (id) => {
    setItemToDelete(id);
    setConfirmOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${itemToDelete}`);
      fetchMessages();
      setItemToDelete(null);
      setModalContent({ title: 'Message Deleted', message: 'The contact inquiry has been permanently removed.' });
      setModalOpen(true);
    } catch (err) {
      console.error("Error deleting message", err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`http://localhost:5000/api/contacts/${id}/status`, { status });
      fetchMessages();
    } catch (err) {
      console.error("Error updating status", err);
    }
  };

  return (
    <div className="space-y-6">
      <SuccessModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={modalContent.title}
        message={modalContent.message}
      />
      <ConfirmModal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Message?"
        message="Are you sure you want to remove this contact inquiry?"
        confirmText="Delete"
      />
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">Contact Messages</h3>
          <button onClick={fetchMessages} className="text-sm font-medium text-green-600 hover:text-green-700">
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="p-12 flex justify-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-600 mr-3"></div>
            Loading messages...
          </div>
        ) : messages.length === 0 ? (
          <div className="p-12 text-center text-gray-500">
            <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No messages received yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600 text-sm">
                  <th className="px-6 py-3 font-semibold">Sender</th>
                  <th className="px-6 py-3 font-semibold">Contact Info</th>
                  <th className="px-6 py-3 font-semibold">Message</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {messages.map((msg) => (
                  <tr key={msg._id} className={`hover:bg-gray-50 transition-colors ${msg.status === 'unread' ? 'bg-green-50/30' : ''}`}>
                    <td className="px-6 py-4 font-medium text-gray-900">{msg.name}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{msg.email}</div>
                      <div className="text-xs text-gray-400">{msg.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-600 line-clamp-2 max-w-xs" title={msg.message}>
                        {msg.message}
                      </p>
                      <span className="text-[10px] text-gray-400">{new Date(msg.createdAt).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={msg.status}
                        onChange={(e) => updateStatus(msg._id, e.target.value)}
                        className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border-none bg-gray-100"
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={() => initiateDelete(msg._id)} className="text-red-400 hover:text-red-600">
                        <Trash2 size={18} />
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

const ProductStatCard = ({ title, value, change, type, icon: Icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <h4 className="text-2xl font-bold text-gray-800 mt-1">{value}</h4>
      </div>
      <div className="p-2 rounded-lg bg-green-100 text-green-600">
        <Icon className="h-6 w-6" />
      </div>
    </div>
    <div className="mt-4 flex items-center text-sm">
      <span className="font-medium text-green-600">{change}</span>
    </div>
  </div>
);

export default AdminDashboard;
