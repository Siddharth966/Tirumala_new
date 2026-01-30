import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  User, LogOut, Phone, MessageCircle, Sprout,
  Calendar, Clock, Upload, Camera, Star, Video
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('experts');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!token || !storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'experts': return <ExpertConsultation />;
      case 'rentals': return <RentalsManager />;
      case 'crop-doctor': return <CropDoctor />;
      case 'chats': return <ChatSystem user={user} />;
      default: return <ExpertConsultation />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col relative overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm h-20 flex items-center justify-between px-4 md:px-8 sticky top-0 z-20">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold text-xl">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Welcome, {user.name}</h1>
            <p className="text-xs text-green-600 font-medium">Verified Farmer</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm border border-red-100"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 max-w-5xl mx-auto w-full relative z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Your Dashboard</h2>
          <p className="text-gray-500">View your scheduled consultations with our experts.</p>
        </div>
        {/* Directly rendering ChatSystem (which is now MySchedule) */}
        <ChatSystem user={user} />
      </main>
    </div>
  );
};

// --- Sub Components ---

const SidebarItem = ({ icon: Icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${active
      ? 'bg-green-600 text-white shadow-lg shadow-green-200'
      : 'text-gray-600 hover:bg-gray-100'
      }`}
  >
    <div className="flex items-center">
      <Icon className={`h-5 w-5 mr-3 ${active ? 'text-white' : 'text-gray-400 group-hover:text-green-600'}`} />
      <span className="font-medium">{label}</span>
    </div>
    {badge && (
      <span className={`text-xs px-2 py-0.5 rounded-full ${active
        ? 'bg-white/20 text-white'
        : 'bg-red-100 text-red-600'
        }`}>
        {badge}
      </span>
    )}
  </button>
);

const ExpertConsultation = () => {
  const experts = [
    { id: 1, name: "Dr. Ramesh Gupta", role: "Soil Specialist", rate: "₹20/min", rating: 4.8, online: true, image: "bg-blue-100" },
    { id: 2, name: "Priya Sharma", role: "Plant Pathologist", rate: "₹25/min", rating: 4.9, online: true, image: "bg-pink-100" },
    { id: 3, name: "Kishan Kumar", role: "Agri-Business", rate: "₹15/min", rating: 4.5, online: false, image: "bg-orange-100" },
    { id: 4, name: "Dr. Anita Desai", role: "Entomologist", rate: "₹30/min", rating: 5.0, online: true, image: "bg-purple-100" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Talk to Agriculture Experts</h2>
          <p className="opacity-90 max-w-lg mb-6">Get instant solutions for crop diseases, soil health, and market trends from verified agronomists.</p>
          <button className="bg-white text-indigo-600 px-6 py-2 rounded-full font-bold hover:bg-opacity-90 transition">
            Recharge Wallet
          </button>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform origin-bottom-right"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts.map((expert) => (
          <div key={expert.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`h-16 w-16 rounded-full ${expert.image} flex items-center justify-center text-xl font-bold text-gray-600 relative`}>
                {expert.name.charAt(0)}
                {expert.online && (
                  <span className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 border-2 border-white rounded-full"></span>
                )}
              </div>
              <div className="bg-yellow-50 text-yellow-700 px-2 py-1 rounded-lg text-xs font-bold flex items-center">
                <Star className="h-3 w-3 mr-1 fill-current" /> {expert.rating}
              </div>
            </div>

            <h3 className="text-lg font-bold text-gray-900">{expert.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{expert.role}</p>

            <div className="flex justify-between items-center mb-6 text-sm">
              <span className="text-gray-500">Consultation Fee</span>
              <span className="font-bold text-gray-900">{expert.rate}</span>
            </div>

            <div className="mt-4">
              <button className="w-full flex items-center justify-center py-3 bg-white border border-green-600 text-green-700 rounded-xl hover:bg-green-50 font-medium transition-colors">
                <Phone className="h-4 w-4 mr-2" /> Request Call
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const RentalsManager = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
      <div className="mx-auto h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <Clock className="h-10 w-10 text-green-600" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No Active Rentals</h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">You haven't rented any equipment yet. Browse our fleet to find the perfect machinery for your needs.</p>
      <button
        onClick={() => window.location.href = '/products'}
        className="px-8 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-xl hover:bg-yellow-300 transition shadow-lg shadow-yellow-100"
      >
        Rent Equipment Now
      </button>
    </div>
  );
};

const CropDoctor = () => {
  const [image, setImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      alert("Analysis Complete: Early Stage Blight detected. Recommended treatment: Copper Fungicide.");
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
          <h3 className="text-xl font-bold text-green-900 mb-2">AI Crop Doctor</h3>
          <p className="text-green-700 mb-6">Upload a photo of your affected crop, and our AI will diagnose the disease and suggest remedies instantly.</p>

          <div className="border-2 border-dashed border-green-300 rounded-xl p-8 text-center bg-white hover:bg-green-50/50 transition cursor-pointer relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {image ? (
              <img src={image} alt="Crop" className="max-h-64 mx-auto rounded-lg shadow-md" />
            ) : (
              <div className="space-y-2">
                <div className="mx-auto h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Camera className="h-6 w-6 text-green-600" />
                </div>
                <p className="font-medium text-gray-600">Click or Drag & Drop Image</p>
                <p className="text-xs text-gray-400">Supports JPG, PNG (Max 5MB)</p>
              </div>
            )}
          </div>

          {image && (
            <button
              onClick={handleAnalyze}
              disabled={analyzing}
              className="w-full mt-4 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-200 flex items-center justify-center"
            >
              {analyzing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <Sprout className="h-5 w-5 mr-2" /> Analyze Crop Health
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-800">Recent Diagnoses</h3>
        {[1, 2].map(i => (
          <div key={i} className="flex p-4 bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="h-20 w-20 bg-gray-200 rounded-lg flex-shrink-0"></div>
            <div className="ml-4">
              <h4 className="font-bold text-gray-800">Tomato Leaf Blight</h4>
              <p className="text-sm text-gray-500 mb-2">Detected on 12 Jan 2026</p>
              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded font-medium">Critical Attention</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ChatSystem = ({ user }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMeeting, setActiveMeeting] = useState(null);

  useEffect(() => {
    if (user) fetchMeetings();
  }, [user]);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/meetings/user/${user.id}`);
      setMeetings(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching meetings", err);
      setLoading(false);
    }
  };

  if (activeMeeting) {
    return (
      <div className="h-[600px] flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center font-bold text-green-700">
              {activeMeeting.specialistName.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{activeMeeting.specialistName}</h3>
              <p className="text-xs text-green-600">Topic: {activeMeeting.topic}</p>
            </div>
          </div>
          <button onClick={() => setActiveMeeting(null)} className="text-gray-500 hover:text-gray-700">
            Close Chat
          </button>
        </div>
        <div className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50/50">
          <div className="text-center text-xs text-gray-400 my-4">
            Session Started - {activeMeeting.date} at {activeMeeting.time}
          </div>
          <div className="flex justify-start">
            <div className="bg-white text-gray-800 border border-gray-200 px-4 py-2 rounded-2xl rounded-tl-none max-w-xs shadow-sm">
              Hello {user.name}, I am ready to discuss "{activeMeeting.topic}". Please share details.
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <input type="text" placeholder="Type your message..." className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500" />
            <button className="p-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md">
              <MessageCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Scheduled Consultations</h2>
        {loading ? (
          <div className="text-gray-500">Loading schedules...</div>
        ) : meetings.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <Calendar className="h-10 w-10 mx-auto mb-2 text-gray-400" />
            <p>No consultations scheduled yet.</p>
            <p className="text-sm text-gray-400">Admin will schedule sessions for you.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {meetings.map(meeting => (
              <div key={meeting._id} className="flex flex-col md:flex-row items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                  <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center text-green-700 font-bold shadow-sm">
                    {meeting.specialistName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{meeting.specialistName}</h3>
                    <p className="text-sm text-gray-600">{meeting.topic}</p>
                    <div className="flex items-center text-xs text-green-700 mt-1 font-medium">
                      <Calendar className="h-3 w-3 mr-1" /> {meeting.date}
                      <Clock className="h-3 w-3 ml-3 mr-1" /> {meeting.time}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setActiveMeeting(meeting)}
                  className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition shadow-md w-full md:w-auto"
                >
                  Join Session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
