import { useMemo, useRef, useState } from 'react';
import './App.css';

function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [recordings, setRecordings] = useState([]);
  const [activeCall, setActiveCall] = useState({
    caller: '',
    callee: '',
    callType: 'Support',
    notes: ''
  });

  const mediaRecorderRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const chunksRef = useRef([]);

  const totalDuration = useMemo(
    () => recordings.reduce((sum, item) => sum + item.durationSeconds, 0),
    [recordings]
  );

  const stopTracks = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setActiveCall((prev) => ({ ...prev, [name]: value }));
  };

  const startRecording = async () => {
    setErrorMessage('');

    if (!activeCall.caller.trim() || !activeCall.callee.trim()) {
      setErrorMessage('Please enter caller and callee before recording.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      const startedAt = Date.now();

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const endedAt = Date.now();

        setRecordings((prev) => [
          {
            id: crypto.randomUUID(),
            caller: activeCall.caller.trim(),
            callee: activeCall.callee.trim(),
            callType: activeCall.callType,
            notes: activeCall.notes.trim(),
            createdAt: new Date().toISOString(),
            durationSeconds: Math.max(1, Math.round((endedAt - startedAt) / 1000)),
            sizeKb: Math.round(audioBlob.size / 1024),
            url: audioUrl
          },
          ...prev
        ]);

        setStatusMessage('Recording saved');
        stopTracks();
      };

      recorder.start();
      mediaRecorderRef.current = recorder;
      setIsRecording(true);
      setStatusMessage('Recording in progress...');
    } catch (error) {
      setErrorMessage('Microphone access is required to record calls.');
      setStatusMessage('Idle');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setStatusMessage('Finalizing recording...');
    }
  };

  const deleteRecording = (id) => {
    setRecordings((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <h1>Call Recorder Dashboard</h1>
        <p>Capture call audio, add context, and manage recordings in one place.</p>
      </header>

      <section className="card">
        <h2>Call Details</h2>
        <div className="form-grid">
          <label>
            Caller
            <input
              name="caller"
              value={activeCall.caller}
              onChange={handleInputChange}
              placeholder="Agent name"
            />
          </label>
          <label>
            Callee
            <input
              name="callee"
              value={activeCall.callee}
              onChange={handleInputChange}
              placeholder="Customer name"
            />
          </label>
          <label>
            Call Type
            <select name="callType" value={activeCall.callType} onChange={handleInputChange}>
              <option>Support</option>
              <option>Sales</option>
              <option>Follow-up</option>
              <option>Escalation</option>
            </select>
          </label>
          <label className="notes-field">
            Notes
            <textarea
              name="notes"
              value={activeCall.notes}
              onChange={handleInputChange}
              placeholder="Record a quick summary..."
              rows={3}
            />
          </label>
        </div>

        <div className="controls">
          <button type="button" onClick={startRecording} disabled={isRecording}>
            Start Recording
          </button>
          <button type="button" onClick={stopRecording} disabled={!isRecording} className="stop-btn">
            Stop Recording
          </button>
          <span className="status">Status: {statusMessage}</span>
        </div>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </section>

      <section className="card">
        <h2>Saved Recordings</h2>
        <p className="summary">
          Total recordings: <strong>{recordings.length}</strong> • Total duration: <strong>{totalDuration}s</strong>
        </p>

        {recordings.length === 0 ? (
          <p className="empty">No recordings yet. Start your first call recording above.</p>
        ) : (
          <ul className="recording-list">
            {recordings.map((recording) => (
              <li key={recording.id}>
                <div>
                  <h3>
                    {recording.caller} → {recording.callee}
                  </h3>
                  <p>
                    {recording.callType} • {recording.durationSeconds}s • {recording.sizeKb} KB
                  </p>
                  {recording.notes && <p className="note">“{recording.notes}”</p>}
                </div>
                <div className="actions">
                  <audio controls src={recording.url} />
                  <a href={recording.url} download={`${recording.caller}-${recording.callee}.webm`}>
                    Download
                  </a>
                  <button type="button" onClick={() => deleteRecording(recording.id)} className="delete-btn">
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default App;
