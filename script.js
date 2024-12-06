
let mediaRecorder;
let audioChunks = [];

// Get UI elements
const recordBtn = document.getElementById('recordBtn');
const stopBtn = document.getElementById('stopBtn');
const playBtn = document.getElementById('playBtn');
const audioPlayback = document.getElementById('audioPlayback');

// Request microphone access
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    mediaRecorder = new MediaRecorder(stream);

    // When data is available, push to audioChunks
    mediaRecorder.ondataavailable = event => {
      audioChunks.push(event.data);
    };

    // On stop, create a Blob and set the audio source
    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioPlayback.src = audioUrl;
      audioPlayback.hidden = false;
    };
  })
  .catch(error => {
    alert('Microphone access denied. Please allow access to use this feature.');
  });

// Start recording
recordBtn.addEventListener('click', () => {
  audioChunks = []; // Clear previous recordings
  mediaRecorder.start();
  recordBtn.disabled = true;
  stopBtn.disabled = false;
});

// Stop recording
stopBtn.addEventListener('click', () => {
  mediaRecorder.stop();
  recordBtn.disabled = false;
  stopBtn.disabled = true;
  playBtn.disabled = false;
});

// Play recording
playBtn.addEventListener('click', () => {
  audioPlayback.play();
});
