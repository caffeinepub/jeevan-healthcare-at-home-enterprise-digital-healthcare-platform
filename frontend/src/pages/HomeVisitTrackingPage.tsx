import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  Home, Phone, MessageSquare, CheckCircle2, MapPin, Navigation,
  Clock, ChevronLeft, Stethoscope, X, Send, Shield
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { getDoctorById } from '@/lib/mockDoctors';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'patient' | 'doctor';
  timestamp: Date;
}

// Predefined doctor positions cycling through the map
const DOCTOR_POSITIONS = [
  { x: 15, y: 20 },
  { x: 28, y: 35 },
  { x: 42, y: 48 },
  { x: 55, y: 58 },
  { x: 65, y: 65 },
];

const PATIENT_POSITION = { x: 75, y: 72 };

const STATUS_MESSAGES = [
  'Doctor has accepted your request',
  'Doctor is on the way',
  'Doctor is nearby',
];

const DOCTOR_CHAT_REPLIES = [
  "I'll be there soon.",
  "I'm on my way, please be ready.",
  "Almost there, about 5 minutes away.",
  "I have noted your concern.",
  "Please keep the address ready.",
];

export default function HomeVisitTrackingPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as {
    doctorId?: string;
    bookingId?: string;
    date?: string;
    timeSlot?: string;
    patientName?: string;
  };

  const doctorId = Number(search?.doctorId ?? 0);
  const bookingId = search?.bookingId ?? '';
  const date = search?.date ?? '';
  const timeSlot = search?.timeSlot ?? '';
  const patientName = search?.patientName ?? 'Patient';

  const doctor = getDoctorById(doctorId);
  const doctorName = doctor?.name ?? 'Dr. Unknown';
  const doctorSpecialty = doctor?.specialty ?? 'Specialist';

  const formattedDate = date
    ? new Date(date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  // Tracking state
  const [doctorPos, setDoctorPos] = useState(DOCTOR_POSITIONS[0]);
  const [posIndex, setPosIndex] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  // ETA countdown (18 minutes = 1080 seconds)
  const [countdown, setCountdown] = useState(1080);
  const [arrived, setArrived] = useState(false);

  // Contact state
  const [showCallModal, setShowCallModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [msgIdCounter, setMsgIdCounter] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const doctorInitials = doctorName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  // Doctor marker animation every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPosIndex(prev => {
        const next = (prev + 1) % DOCTOR_POSITIONS.length;
        setDoctorPos(DOCTOR_POSITIONS[next]);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Status banner cycling every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIndex(prev => (prev + 1) % STATUS_MESSAGES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  // ETA countdown
  useEffect(() => {
    if (arrived) return;
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          setArrived(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [arrived]);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Close modal on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowCallModal(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const formatCountdown = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const newMsg: ChatMessage = {
      id: msgIdCounter,
      text: chatInput.trim(),
      sender: 'patient',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMsg]);
    setMsgIdCounter(prev => prev + 1);
    setChatInput('');

    const replyText = DOCTOR_CHAT_REPLIES[Math.floor(Math.random() * DOCTOR_CHAT_REPLIES.length)];
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        text: replyText,
        sender: 'doctor',
        timestamp: new Date(),
      }]);
    }, 2000);
  };

  // SVG path for dashed route line between doctor and patient
  const svgDoctorX = (doctorPos.x / 100) * 100;
  const svgDoctorY = (doctorPos.y / 100) * 100;
  const svgPatientX = (PATIENT_POSITION.x / 100) * 100;
  const svgPatientY = (PATIENT_POSITION.y / 100) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: '/' })}
              className="text-gray-500 hover:text-gray-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
              <Home className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-800">Home Visit Tracking</p>
              <p className="text-xs text-gray-500">{doctorName} · {doctorSpecialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {bookingId && (
              <Badge variant="outline" className="border-primary/30 text-primary text-xs">
                BKG-{bookingId.replace(/\D/g, '').slice(-5).padStart(5, '0')}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-5 space-y-5">

        {/* Status Banner */}
        <div className="bg-primary text-white rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <Navigation className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="font-semibold text-sm">{STATUS_MESSAGES[statusIndex]}</p>
            {formattedDate && timeSlot && (
              <p className="text-blue-100 text-xs mt-0.5">{formattedDate} · {timeSlot}</p>
            )}
          </div>
          <div className="ml-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse block" />
          </div>
        </div>

        {/* Live Tracking Map */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-soft overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-gray-800">Live Tracking</span>
            <span className="ml-auto text-xs text-green-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              Live
            </span>
          </div>

          {/* Map Area */}
          <div
            className="relative w-full bg-gray-100 overflow-hidden"
            style={{ height: '320px' }}
          >
            {/* Grid background */}
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1" />
                </pattern>
                <pattern id="bigGrid" width="120" height="120" patternUnits="userSpaceOnUse">
                  <rect width="120" height="120" fill="url(#grid)" />
                  <path d="M 120 0 L 0 0 0 120" fill="none" stroke="#d1d5db" strokeWidth="1.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#bigGrid)" />

              {/* Road-like lines */}
              <line x1="0" y1="160" x2="100%" y2="160" stroke="#d1d5db" strokeWidth="8" strokeOpacity="0.5" />
              <line x1="200" y1="0" x2="200" y2="100%" stroke="#d1d5db" strokeWidth="8" strokeOpacity="0.5" />
              <line x1="450" y1="0" x2="450" y2="100%" stroke="#d1d5db" strokeWidth="6" strokeOpacity="0.4" />
              <line x1="0" y1="80" x2="100%" y2="80" stroke="#d1d5db" strokeWidth="5" strokeOpacity="0.3" />
              <line x1="0" y1="240" x2="100%" y2="240" stroke="#d1d5db" strokeWidth="5" strokeOpacity="0.3" />

              {/* Dashed route line */}
              <line
                x1={`${doctorPos.x}%`}
                y1={`${doctorPos.y}%`}
                x2={`${PATIENT_POSITION.x}%`}
                y2={`${PATIENT_POSITION.y}%`}
                stroke="#0A5EB0"
                strokeWidth="2.5"
                strokeDasharray="8,5"
                strokeOpacity="0.7"
              />
            </svg>

            {/* Doctor Marker */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                left: `${doctorPos.x}%`,
                top: `${doctorPos.y}%`,
                transform: 'translate(-50%, -100%)',
                transition: 'left 1.5s ease-in-out, top 1.5s ease-in-out',
              }}
            >
              <div className="w-10 h-10 rounded-full bg-primary border-3 border-white shadow-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">{doctorInitials}</span>
              </div>
              <div className="bg-primary text-white text-xs px-2 py-0.5 rounded-full mt-1 whitespace-nowrap shadow">
                {doctorName.split(' ').slice(0, 2).join(' ')}
              </div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-primary -mt-0.5" />
            </div>

            {/* Patient Home Marker */}
            <div
              className="absolute flex flex-col items-center"
              style={{
                left: `${PATIENT_POSITION.x}%`,
                top: `${PATIENT_POSITION.y}%`,
                transform: 'translate(-50%, -100%)',
              }}
            >
              <div className="w-10 h-10 rounded-full bg-green-600 border-3 border-white shadow-lg flex items-center justify-center">
                <Home className="w-5 h-5 text-white" />
              </div>
              <div className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full mt-1 whitespace-nowrap shadow">
                Your Home
              </div>
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-6 border-l-transparent border-r-transparent border-t-green-600 -mt-0.5" />
            </div>
          </div>

          {/* Map Legend */}
          <div className="px-5 py-3 flex items-center gap-5 text-xs text-gray-500 border-t border-gray-100">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span>Doctor</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-green-600" />
              <span>Your Home</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 border-t-2 border-dashed border-primary" />
              <span>Route</span>
            </div>
          </div>
        </div>

        {/* ETA Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-soft p-5 text-center">
          {arrived ? (
            <div className="flex flex-col items-center gap-3 py-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <div className="bg-green-600 text-white px-6 py-3 rounded-2xl">
                <p className="text-xl font-bold">Doctor has arrived!</p>
                <p className="text-green-100 text-sm mt-1">Please open the door</p>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-2">Estimated Arrival</p>
              <div className="text-5xl font-bold text-primary font-mono mb-2">
                {formatCountdown(countdown)}
              </div>
              <p className="text-sm text-gray-500 flex items-center justify-center gap-1.5">
                <Clock className="w-4 h-4" />
                Doctor is on the way
              </p>
            </>
          )}
        </div>

        {/* Contact Doctor Section */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-soft p-5">
          <h3 className="font-heading font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-primary" />
            Contact Doctor
          </h3>

          {/* Doctor Info */}
          <div className="flex items-center gap-4 mb-5 p-4 bg-gray-50 rounded-xl">
            <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center shrink-0">
              <span className="text-lg font-bold text-primary">{doctorInitials}</span>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{doctorName}</p>
              <p className="text-sm text-gray-500">{doctorSpecialty}</p>
              {doctor && (
                <p className="text-xs text-gray-400 mt-0.5">{doctor.experience} years experience</p>
              )}
            </div>
            <div className="flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-xs font-medium">
              <Shield className="w-3 h-3" />
              Verified Doctor
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => setShowCallModal(true)}
              className="flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all"
            >
              <Phone className="w-4 h-4" />
              Call Doctor
            </button>
            <button
              onClick={() => setShowChat(!showChat)}
              className="flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all border border-gray-200"
            >
              <MessageSquare className="w-4 h-4" />
              {showChat ? 'Hide Chat' : 'Message Doctor'}
            </button>
          </div>

          {/* Inline Chat Panel */}
          {showChat && (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-200 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-semibold text-gray-700">Chat with {doctorName}</span>
              </div>

              <div className="h-52 overflow-y-auto p-3 space-y-2 bg-white">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <MessageSquare className="w-8 h-8 text-gray-300 mb-2" />
                    <p className="text-gray-400 text-xs">No messages yet</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                      {msg.sender === 'doctor' && (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-1.5 shrink-0 mt-1">
                          <span className="text-xs font-bold text-primary">{doctorInitials}</span>
                        </div>
                      )}
                      <div className={`max-w-xs px-3 py-1.5 rounded-2xl text-sm ${
                        msg.sender === 'patient'
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                      }`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-0.5 ${msg.sender === 'patient' ? 'text-blue-200' : 'text-gray-400'}`}>
                          {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="p-2.5 border-t border-gray-200 flex gap-2 bg-gray-50">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message…"
                  className="flex-1 bg-white border border-gray-300 rounded-xl px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-primary"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim()}
                  className="w-9 h-9 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 flex items-center justify-center transition-all"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Call Doctor Modal */}
      {showCallModal && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
          onClick={() => setShowCallModal(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-heading font-bold text-gray-800">Call Doctor</h3>
              <button
                onClick={() => setShowCallModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-4 py-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">{doctorInitials}</span>
              </div>
              <div className="text-center">
                <p className="font-semibold text-gray-800">{doctorName}</p>
                <p className="text-sm text-gray-500">{doctorSpecialty}</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-6 py-3 text-center">
                <p className="text-xs text-gray-500 mb-1">Contact Number</p>
                <p className="text-xl font-bold text-primary tracking-wider">+91 98765 XXXXX</p>
              </div>
              <p className="text-xs text-gray-400 text-center">
                This is a mock number for demonstration purposes.
              </p>
            </div>

            <button
              onClick={() => setShowCallModal(false)}
              className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
