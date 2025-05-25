import React, { useState } from 'react';

export default function UploadFile() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onloadstart = () => setUploading(true);
    xhr.onloadend = () => setUploading(false);

    xhr.send(formData);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Arial, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '220px', background: '#4B0082', color: 'white', padding: '20px' }}>
        <h2 style={{ marginBottom: '30px' }}>EXCEL ANALYTICS</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {['Dashboard', 'Upload Files', 'File History', 'Visualizations', 'Smart Insight', 'Downloads', 'Account Settings'].map(item => (
            <li key={item} style={{ marginBottom: '15px', background: item === 'Upload Files' ? '#6A0DAD' : 'transparent', padding: '10px', borderRadius: '8px' }}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, background: '#f4f0fa', padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ width: '90%', maxWidth: '800px', background: '#ffffff', borderRadius: '12px', padding: '30px', boxShadow: '0 2px 6px rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Upload Box */}
          <div style={{ border: '2px dashed #6A0DAD', padding: '40px', textAlign: 'center', borderRadius: '10px', flex: 1, marginRight: '20px' }}>
            <div style={{ fontSize: '32px', marginBottom: '15px' }}>⬆</div>
            <p>Drag and Drop your files here</p>
            <label htmlFor="file-upload" style={{ marginTop: '10px', display: 'inline-block', background: '#6A0DAD', color: 'white', padding: '10px 20px', borderRadius: '6px', cursor: 'pointer' }}>
              📁 Browse Files
            </label>
            <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
            {selectedFile && (
              <button onClick={handleUpload} style={{ marginTop: '15px', display: 'block', background: '#4B0082', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                Upload
              </button>
            )}
            {uploading && (
              <div style={{ marginTop: '10px', width: '100%' }}>
                <div style={{ height: '10px', background: '#ddd', borderRadius: '5px' }}>
                  <div style={{ width: ${uploadProgress}%, height: '100%', background: '#6A0DAD', borderRadius: '5px' }}></div>
                </div>
                <p style={{ marginTop: '5px', fontSize: '12px' }}>{uploadProgress}%</p>
              </div>
            )}
          </div>

          {/* Selected File Display */}
          <div style={{ background: '#e8dff4', padding: '20px', borderRadius: '10px', flex: 1, textAlign: 'center' }}>
            {selectedFile ? (
              <p>{selectedFile.name}</p>
            ) : (
              <p style={{ color: '#4B0082', fontWeight: 'bold' }}>No files selected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
