import React, { useState, useEffect } from 'react';

const styles = `
.app {
  display: flex;
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 200px;
  background-color: #e8d3ff;
  color: white;
  padding: 20px;
  min-height: 100vh;
}

.sidebar h2 {
  margin-bottom: 20px;
  font-size: 18px;
  color: #4b0082;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin-bottom: 10px;
  cursor: pointer;
  padding: 8px;
  border-radius: 5px;
  font-size: 15px;
  color: #4b0082;
}

.sidebar nav ul li:hover {
  background-color: #d6aaff;
}

.sidebar nav ul li.active {
  background-color: #e8d3ff;
  font-weight: bold;
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #e8d3ff;
  color: #4b0082;
}

.file-history {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px #ccc;
  margin-bottom: 30px;
  color: #4b0082;
}

.file-history h3,
.chart-section h3 {
  color: #4b0082;
  font-size: 20px;
  margin-bottom: 20px;
}

.file-history input {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
  color: #4b0082;
}

.file-history table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 40px;
}

.file-history th,
.file-history td {
  border: 1px solid #ccc;
  padding: 12px;
  text-align: left;
  font-size: 14px;
  color: #4b0082;
}

.file-history th {
  background-color: #e8d3ff;
  font-weight: bold;
  color: #4b0082;
}

.file-history td button {
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;
  border: none;
  background: transparent;
  font-size: 16px;
  color: #4b0082;
}

.file-history .view-btn:hover {
  color: #0040ff;
}
.file-history .download-btn:hover {
  color: #4b0082;
}
.file-history .delete-btn:hover {
  color: red;
}

.chart-section {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 10px #ccc;
  color: #4b0082;
  margin-top: 30px;
}

.vertical-chart {
  display: flex;
  align-items: flex-end;
  gap: 30px;
  height: 500px;
  padding: 20px 10px 150px 10px;
  border-top: 1px solid #ccc;
}

.chart-bar {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80px;
}

.bar {
  width: 100%;
  background-color: #e8d3ff;
  text-align: center;
  border-radius: 5px 5px 0 0;
  color: #4b0082;
  font-weight: bold;
}

.bar-label {
  margin-top: 60px;
  font-size: 12px;
  text-align: center;
  color: #4b0082;
  word-wrap: break-word;
}
`;

const initialFiles = [
  { name: '', rows: 1, status: '✔', uploadedAt: '' },
  { name: '', rows:2 , status: '✔', uploadedAt: '' },
  { name: '', rows:3 , status: '✔', uploadedAt: '' },
  { name: '', rows: 4, status: '✔', uploadedAt: '' },
  { name: '', rows: 5, status: '✔', uploadedAt: '' },
];

function App() {
  const [files, setFiles] = useState(initialFiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('File History');

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fix: default maxRows to 1 if no filtered files to avoid invalid height calculations
  const maxRows = filteredFiles.length > 0 ? Math.max(...filteredFiles.map(file => file.rows)) : 1;

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = styles;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>EXCEL ANALYTICS</h2>
        <nav>
          <ul>
            {[
              'Dashboard',
              'Upload Files',
              'File History',
              'Visualizations',
              'Smart Insight',
              'Downloads',
              'Account Settings',
            ].map(section => (
              <li
                key={section}
                className={section === activeSection ? 'active' : ''}
                onClick={() => setActiveSection(section)}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        {activeSection === 'File History' && (
          <>
            <section className="file-history">
              <h3>File History</h3>
              <input
                type="text"
                placeholder="Search files..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <table>
                <thead>
                  <tr>
                    <th>File Name</th>
                    <th>Rows</th>
                    <th>Status</th>
                    <th>Uploaded At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFiles.map((file, index) => (
                    <tr key={index}>
                      <td>{file.name}</td>
                      <td>{file.rows}</td>
                      <td style={{ color: '#4b0082' }}>{file.status}</td>
                      <td>{file.uploadedAt}</td>
                      <td>
                        <button className="view-btn">👁</button>
                        <button className="download-btn">⬇</button>
                        <button className="delete-btn">🗑</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            <section className="chart-section">
              <h3>File Data Visualization</h3>
              <div className="vertical-chart">
                {filteredFiles.map(file => (
                  <div className="chart-bar" key={file.name}>
                    <div
                      className="bar"
                     style={{ height: ${(file.rows / maxRows) * 400}px }}
                    >
                      {file.rows}
                    </div>
                    <div className="bar-label">{file.name.split('.')[0]}</div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
