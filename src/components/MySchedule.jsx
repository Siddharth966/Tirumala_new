const MySchedule = ({ user }) => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMeeting, setActiveMeeting] = useState(null);

  useEffect(() => {
    if (user) fetchMeetings();
  }, [user]);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/meetings/user/${user._id}`);
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
            <p className="text-sm text-gray-400">Admin will schedule specific sessions for you.</p>
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
