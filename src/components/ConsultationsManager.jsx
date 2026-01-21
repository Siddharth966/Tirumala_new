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
      const [meetingsRes, usersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/meetings'),
        axios.get('http://localhost:5000/api/auth/users')
      ]);
      setMeetings(meetingsRes.data);
      setUsers(usersRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching data", err);
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
