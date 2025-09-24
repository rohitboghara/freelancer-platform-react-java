import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@mantine/core';

const Message = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  let freelancerId;

  if (token) {
    const decoded = jwtDecode(token);
    freelancerId = decoded.jti;
  }

  const backendUrl = 'http://192.168.0.106:3031';

  // Fetch saved notifications
  const fetchNotifications = async () => {
    if (!freelancerId) return;

    try {
      const res = await axios.get(
        `${backendUrl}/api/notifications/${freelancerId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotifications(res.data);
    } catch (err) {
      console.error('Failed to fetch notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  // Connect WebSocket for real-time notification
  useEffect(() => {
    if (!freelancerId) return;

    const ws = new WebSocket(
     `ws://192.168.0.106:3031/ws?userId=${freelancerId}`
    );

    ws.onopen = () => console.log('✅ WebSocket connected');
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        console.log('📩 Real-time message received:', message);
        setNotifications((prev) => [message, ...prev]);
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };
    ws.onerror = (err) => console.error('WebSocket error:', err);
    ws.onclose = () => console.log('🔌 WebSocket closed');

    return () => {
      ws.close();
    };
  }, [freelancerId]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleView = (link) => {
    const internalRoute = new URL(link).pathname;
    navigate(internalRoute);
  };

  const deleteNotification = async (index, id) => {
    try {
      await axios.delete(`${backendUrl}/api/notifications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotifications((prev) => prev.filter((_, i) => i !== index));
    } catch (err) {
      console.error('❌ Failed to delete notification:', err);
    }
  };

  const deleteAll = async () => {
    try {
      await axios.delete(
       `${backendUrl}/api/notifications/user/${freelancerId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications([]);
    } catch (err) {
      console.error('❌ Failed to delete all notifications:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">Loading...</div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Notifications</h2>
        {notifications.length > 0 && (
          <Button color='#2E6F40' variant="filled" onClick={deleteAll}>
            Clear All
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg h-[600px] overflow-y-auto p-4">
        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No notifications yet.</p>
        ) : (
          notifications.map((msg, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <div className="text-sm font-semibold text-gray-700">
                {msg.title}
              </div>
              <div className="text-gray-800">{msg.message}</div>
              <div className="text-xs text-gray-500 mt-1">
                From: {msg.senderName} |{' '}
                {new Date(msg.timestamp).toLocaleString()}
              </div>

              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => handleView(msg.link)}
                  color='#2E6F40'
                >
                  View Details
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  color='#2E6F40'
                  onClick={() => deleteNotification(index, msg.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Message;