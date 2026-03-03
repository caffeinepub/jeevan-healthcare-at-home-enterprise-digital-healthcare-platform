import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearch } from '@tanstack/react-router';
import {
  Mic, MicOff, Video, VideoOff, PhoneOff, MessageSquare, Paperclip,
  FileText, X, Send, Plus, Trash2, Download, CheckCircle2, User,
  Stethoscope, Calendar, Clock, ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDoctorById } from '@/lib/mockDoctors';

interface ChatMessage {
  id: number;
  text: string;
  sender: 'patient' | 'doctor';
  timestamp: Date;
}

interface MedicineRow {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

const DOCTOR_REPLIES = [
  'Thank you, I have noted that.',
  'I understand. Let me review your symptoms.',
  'That is helpful information. Please continue.',
  'I see. Have you experienced this before?',
  'Noted. I will take that into consideration.',
];

export default function OnlineConsultationPage() {
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

  // Video state
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'waiting' | 'connected'>('waiting');
  const [showChat, setShowChat] = useState(false);
  const [showFiles, setShowFiles] = useState(false);
  const [activeTab, setActiveTab] = useState('video');

  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [msgIdCounter, setMsgIdCounter] = useState(1);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prescription state
  const [diagnosis, setDiagnosis] = useState('');
  const [medicines, setMedicines] = useState<MedicineRow[]>([]);
  const [notes, setNotes] = useState('');
  const [medIdCounter, setMedIdCounter] = useState(1);
  const [showPrescriptionPreview, setShowPrescriptionPreview] = useState(false);

  // Connection status transition
  useEffect(() => {
    const timer = setTimeout(() => setConnectionStatus('connected'), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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

    // Mock doctor reply after 2 seconds
    const replyText = DOCTOR_REPLIES[Math.floor(Math.random() * DOCTOR_REPLIES.length)];
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: prev.length + 100 + Math.random(),
        text: replyText,
        sender: 'doctor',
        timestamp: new Date(),
      }]);
    }, 2000);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setFileError('');
    const remaining = 5 - uploadedFiles.length;
    if (files.length > remaining) {
      setFileError('Maximum 5 files allowed');
      const allowed = files.slice(0, remaining);
      setUploadedFiles(prev => [...prev, ...allowed]);
    } else {
      setUploadedFiles(prev => [...prev, ...files]);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
    setFileError('');
  };

  const addMedicine = () => {
    setMedicines(prev => [...prev, { id: medIdCounter, name: '', dosage: '', frequency: 'Once daily', duration: '' }]);
    setMedIdCounter(prev => prev + 1);
  };

  const updateMedicine = (id: number, field: keyof MedicineRow, value: string) => {
    setMedicines(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const removeMedicine = (id: number) => {
    setMedicines(prev => prev.filter(m => m.id !== id));
  };

  const handleEndCall = () => {
    navigate({ to: '/' });
  };

  const patientInitials = patientName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  const doctorInitials = doctorName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ to: '/' })}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-white">{doctorName}</p>
              <p className="text-xs text-gray-400">{doctorSpecialty}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {bookingId && (
              <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                BKG-{bookingId.replace(/\D/g, '').slice(-5).padStart(5, '0')}
              </Badge>
            )}
            {formattedDate && timeSlot && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{formattedDate}</span>
                <Clock className="w-3.5 h-3.5 ml-1" />
                <span>{timeSlot}</span>
              </div>
            )}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
              connectionStatus === 'connected'
                ? 'bg-green-900/50 text-green-400 border border-green-700'
                : 'bg-yellow-900/50 text-yellow-400 border border-yellow-700'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${connectionStatus === 'connected' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`} />
              {connectionStatus === 'connected' ? 'Connected' : 'Waiting…'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-gray-800 border border-gray-700 mb-4">
            <TabsTrigger value="video" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-300">
              <Video className="w-4 h-4 mr-1.5" />
              Video
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-300">
              <MessageSquare className="w-4 h-4 mr-1.5" />
              Chat
              {messages.length > 0 && (
                <span className="ml-1.5 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {messages.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="files" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-300">
              <Paperclip className="w-4 h-4 mr-1.5" />
              Files
              {uploadedFiles.length > 0 && (
                <span className="ml-1.5 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {uploadedFiles.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="prescription" className="data-[state=active]:bg-primary data-[state=active]:text-white text-gray-300">
              <FileText className="w-4 h-4 mr-1.5" />
              e-Prescription
            </TabsTrigger>
          </TabsList>

          {/* VIDEO TAB */}
          <TabsContent value="video">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Main Video Area */}
              <div className="flex-1">
                <div className="relative bg-gray-900 rounded-2xl overflow-hidden" style={{ minHeight: '420px' }}>
                  {/* Doctor video placeholder */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center mb-4">
                      <span className="text-3xl font-bold text-primary">{doctorInitials}</span>
                    </div>
                    <p className="text-white font-semibold text-lg">{doctorName}</p>
                    <p className="text-gray-400 text-sm">{doctorSpecialty}</p>
                  </div>

                  {/* Status overlay */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
                      connectionStatus === 'connected'
                        ? 'bg-green-900/80 text-green-300 border border-green-700'
                        : 'bg-gray-800/90 text-yellow-300 border border-yellow-700'
                    }`}>
                      {connectionStatus === 'connected' ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Connected
                        </>
                      ) : (
                        <>
                          <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                          Waiting for doctor to join…
                        </>
                      )}
                    </div>
                  </div>

                  {/* Patient self-view */}
                  <div className="absolute bottom-4 right-4 w-28 h-20 bg-gray-800 rounded-xl border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                    {isCameraOff ? (
                      <div className="flex flex-col items-center gap-1">
                        <VideoOff className="w-5 h-5 text-gray-400" />
                        <span className="text-xs text-gray-400">Camera off</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">{patientInitials}</span>
                        </div>
                        <span className="text-xs text-gray-300">You</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Control Bar */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isMuted ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => setIsCameraOff(!isCameraOff)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCameraOff ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                    title={isCameraOff ? 'Turn Camera On' : 'Turn Camera Off'}
                  >
                    {isCameraOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={() => setActiveTab('chat')}
                    className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all relative"
                    title="Chat"
                  >
                    <MessageSquare className="w-5 h-5" />
                    {messages.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full text-xs flex items-center justify-center">
                        {messages.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveTab('files')}
                    className="w-12 h-12 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center transition-all"
                    title="Upload Files"
                  >
                    <Paperclip className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleEndCall}
                    className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-all shadow-lg"
                    title="End Call"
                  >
                    <PhoneOff className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* CHAT TAB */}
          <TabsContent value="chat">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 flex flex-col" style={{ height: '500px' }}>
              <div className="px-4 py-3 border-b border-gray-800 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                <span className="font-semibold text-sm">Consultation Chat</span>
                <span className="text-xs text-gray-400 ml-auto">with {doctorName}</span>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <MessageSquare className="w-10 h-10 text-gray-600 mb-3" />
                    <p className="text-gray-500 text-sm">No messages yet</p>
                    <p className="text-gray-600 text-xs mt-1">Start the conversation with your doctor</p>
                  </div>
                ) : (
                  messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'patient' ? 'justify-end' : 'justify-start'}`}>
                      {msg.sender === 'doctor' && (
                        <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center mr-2 shrink-0 mt-1">
                          <span className="text-xs font-bold text-primary">{doctorInitials}</span>
                        </div>
                      )}
                      <div className={`max-w-xs lg:max-w-md px-3 py-2 rounded-2xl text-sm ${
                        msg.sender === 'patient'
                          ? 'bg-primary text-white rounded-br-sm'
                          : 'bg-gray-700 text-gray-100 rounded-bl-sm'
                      }`}>
                        <p>{msg.text}</p>
                        <p className={`text-xs mt-1 ${msg.sender === 'patient' ? 'text-blue-200' : 'text-gray-400'}`}>
                          {msg.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-800 flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message…"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                />
                <button
                  onClick={sendMessage}
                  disabled={!chatInput.trim()}
                  className="w-10 h-10 rounded-xl bg-primary hover:bg-primary/90 disabled:opacity-40 flex items-center justify-center transition-all"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </TabsContent>

          {/* FILES TAB */}
          <TabsContent value="files">
            <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">Upload Files</span>
                </div>
                <span className="text-xs text-gray-400">{uploadedFiles.length}/5 files</span>
              </div>

              <p className="text-xs text-gray-400 mb-4">
                Share medical reports, prescriptions, or images with your doctor. Accepted: PDF, JPG, PNG (max 5 files)
              </p>

              {fileError && (
                <div className="bg-red-900/30 border border-red-700 rounded-xl px-3 py-2 mb-3 text-red-400 text-sm">
                  {fileError}
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="application/pdf,image/jpeg,image/png"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadedFiles.length >= 5}
                className="w-full border-2 border-dashed border-gray-600 hover:border-primary rounded-xl py-8 flex flex-col items-center gap-2 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Paperclip className="w-8 h-8 text-gray-500" />
                <span className="text-sm text-gray-400">Click to select files</span>
                <span className="text-xs text-gray-600">PDF, JPG, PNG</span>
              </button>

              {uploadedFiles.length > 0 && (
                <div className="mt-4 space-y-2">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-800 rounded-xl px-3 py-2.5">
                      <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-white truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</p>
                      </div>
                      <button
                        onClick={() => removeFile(index)}
                        className="w-7 h-7 rounded-lg bg-red-900/40 hover:bg-red-900/70 flex items-center justify-center text-red-400 transition-all"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          {/* E-PRESCRIPTION TAB */}
          <TabsContent value="prescription">
            {showPrescriptionPreview ? (
              <div className="bg-white text-gray-900 rounded-2xl p-6 print:shadow-none">
                {/* Prescription Header */}
                <div className="border-b-2 border-primary pb-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-heading text-xl font-bold text-primary">Jeevan HealthCare</h2>
                      <p className="text-xs text-gray-500">Digital e-Prescription</p>
                    </div>
                    <div className="text-right text-xs text-gray-500">
                      <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
                      {bookingId && <p>Booking: BKG-{bookingId.replace(/\D/g, '').slice(-5).padStart(5, '0')}</p>}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Patient Name</p>
                    <p className="font-semibold">{patientName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Doctor</p>
                    <p className="font-semibold">{doctorName}</p>
                    <p className="text-xs text-gray-500">{doctorSpecialty}</p>
                  </div>
                </div>

                {diagnosis && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-medium mb-1">Diagnosis</p>
                    <p className="text-sm bg-gray-50 rounded-lg p-3">{diagnosis}</p>
                  </div>
                )}

                {medicines.length > 0 && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-medium mb-2">Medicines</p>
                    <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-primary/10">
                        <tr>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-primary">Medicine</th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-primary">Dosage</th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-primary">Frequency</th>
                          <th className="text-left px-3 py-2 text-xs font-semibold text-primary">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {medicines.map((med, i) => (
                          <tr key={med.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                            <td className="px-3 py-2">{med.name || '—'}</td>
                            <td className="px-3 py-2">{med.dosage || '—'}</td>
                            <td className="px-3 py-2">{med.frequency}</td>
                            <td className="px-3 py-2">{med.duration || '—'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {notes && (
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 font-medium mb-1">Additional Notes</p>
                    <p className="text-sm bg-gray-50 rounded-lg p-3">{notes}</p>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                  <p className="text-xs text-gray-400">This is a digitally generated prescription.</p>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-800">{doctorName}</p>
                    <p className="text-xs text-gray-500">{doctorSpecialty}</p>
                  </div>
                </div>

                <div className="flex gap-3 mt-5 print:hidden">
                  <Button
                    onClick={() => window.print()}
                    className="flex-1 bg-primary text-white hover:bg-primary/90"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowPrescriptionPreview(false)}
                    className="flex-1 border-gray-300 text-gray-700"
                  >
                    Edit Prescription
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5 space-y-5">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-sm">e-Prescription</span>
                </div>

                {/* Read-only fields */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 font-medium block mb-1">Patient Name</label>
                    <input
                      readOnly
                      value={patientName}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-300 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-medium block mb-1">Doctor</label>
                    <input
                      readOnly
                      value={doctorName}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-300 cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 font-medium block mb-1">Date</label>
                    <input
                      readOnly
                      value={new Date().toLocaleDateString('en-IN')}
                      className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-gray-300 cursor-not-allowed"
                    />
                  </div>
                </div>

                {/* Diagnosis */}
                <div>
                  <label className="text-xs text-gray-400 font-medium block mb-1">Diagnosis</label>
                  <textarea
                    value={diagnosis}
                    onChange={e => setDiagnosis(e.target.value)}
                    placeholder="Enter diagnosis…"
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Medicines */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs text-gray-400 font-medium">Medicines</label>
                    <button
                      onClick={addMedicine}
                      className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Medicine
                    </button>
                  </div>

                  {medicines.length === 0 ? (
                    <div className="border border-dashed border-gray-700 rounded-xl py-6 text-center">
                      <p className="text-gray-500 text-sm">No medicines added yet</p>
                      <button onClick={addMedicine} className="text-primary text-xs mt-1 hover:underline">
                        + Add first medicine
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {medicines.map(med => (
                        <div key={med.id} className="bg-gray-800 rounded-xl p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 relative">
                          <input
                            value={med.name}
                            onChange={e => updateMedicine(med.id, 'name', e.target.value)}
                            placeholder="Medicine name"
                            className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                          />
                          <input
                            value={med.dosage}
                            onChange={e => updateMedicine(med.id, 'dosage', e.target.value)}
                            placeholder="Dosage (e.g. 500mg)"
                            className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                          />
                          <select
                            value={med.frequency}
                            onChange={e => updateMedicine(med.id, 'frequency', e.target.value)}
                            className="bg-gray-700 border border-gray-600 rounded-lg px-2 py-1.5 text-sm text-white focus:outline-none focus:border-primary"
                          >
                            <option>Once daily</option>
                            <option>Twice daily</option>
                            <option>Thrice daily</option>
                          </select>
                          <div className="flex gap-2">
                            <input
                              value={med.duration}
                              onChange={e => updateMedicine(med.id, 'duration', e.target.value)}
                              placeholder="Duration (e.g. 7 days)"
                              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-2 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
                            />
                            <button
                              onClick={() => removeMedicine(med.id)}
                              className="w-8 h-8 rounded-lg bg-red-900/40 hover:bg-red-900/70 flex items-center justify-center text-red-400 transition-all shrink-0"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="text-xs text-gray-400 font-medium block mb-1">Additional Notes</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Additional instructions or notes…"
                    rows={3}
                    className="w-full bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                <button
                  onClick={() => setShowPrescriptionPreview(true)}
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  Generate Prescription
                </button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
