import React, { useEffect, useState } from "react";

const styles = `
body {
  margin: 0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f7fa;
  overflow-x: hidden;
}

.app-container {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
}

.sidebar {
  min-width: 240px;
  background-color: #e5e7eb; /* light gray */
  color: #1f2937;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.sidebar h2 {
  font-size: 22px;
  margin-bottom: 32px;
  text-align: center;
  color: #111827;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.sidebar li:hover {
  color: #3b82f6;
}

.sidebar-icon {
  margin-right: 12px;
  font-size: 18px;
  display: inline-block;
  width: 20px;
  text-align: center;
}

.dashboard-container {
  min-width: 900px;
  padding: 32px;
  background-color: #e8d3ff;
  height: 100vh;
  overflow-y: auto;
  box-sizing: border-box;
}

.dashboard-title {
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
}

.dashboard-subtitle {
  font-size: 16px;
  color: #6b7280;
  margin-top: 4px;
  margin-bottom: 24px;
}

.card-grid {
  display: flex;
  flex-direction: row;
  gap: 16px;
  margin-bottom: 32px;
}

.card {
  background: #ffffff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  flex: 1;
  min-width: 200px;
}

.card-title {
  color: #6b7280;
  font-size: 14px;
  margin-bottom: 6px;
}

.card-value {
  font-size: 24px;
  font-weight: 600;
  color: #111827;
}

.custom-button {
  background-color: #1d4ed8;
  color: white;
  padding: 10px 18px;
  border: none;
  border-radius: 12px;
  margin-top: 20px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #1e40af;
}

.history-section {
  margin-top: 24px;
}

.history-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 12px;
}

.file-list {
  list-style: disc inside;
  color: #374151;
  font-size: 16px;
  margin-top: 8px;
}

.no-files {
  color: #6b7280;
  font-size: 16px;
}`;

const Card = ({ title, value }) => (
  <div className="card">
    <p className="card-title">{title}</p>
    <p className="card-value">{value}</p>
  </div>
);

const Button = ({ onClick, children }) => (
  <button onClick={onClick} className="custom-button">
    {children}
  </button>
);

const Sidebar = () => (
  <div className="sidebar">
    <h2>Excel Analytics</h2>
    <ul>
      <li>
        <span className="sidebar-icon">📊</span> Dashboard
      </li>
      <li>
        <span className="sidebar-icon">📁</span> My Projects
      </li>
      <li>
        <span className="sidebar-icon">📈</span> Charts
      </li>
      <li>
        <span className="sidebar-icon">📝</span> Reports
      </li>
      <li>
        <span className="sidebar-icon">⚙️</span> Settings
      </li>
    </ul>
  </div>
);

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [visualizations, setVisualizations] = useState(0);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    const mockData = {
      totalFiles: 0,
      visualizations: 0,
      lastAnalysis: null,
    };

    setFiles(Array(mockData.totalFiles).fill("File"));
    setVisualizations(mockData.visualizations);
  };

  const uploadFile = () => {
    setFiles([...files, `File ${files.length + 1}`]);
    setVisualizations(visualizations + 1);
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="dashboard-container">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">
          View your recent data analysis and visualizations
        </p>

        <div className="card-grid">
          <Card title="Total Files" value={files.length} />
          <Card title="Visualizations" value={visualizations} />
          <Card
            title="Last Analysis"
            value={
              files.length > 0 ? `File ${files.length}` : "No analysis yet"
            }
          />
        </div>

        <div className="history-section">
          <h2 className="history-title">Recent Analysis History</h2>
          {files.length === 0 ? (
            <p className="no-files">No files analyzed yet</p>
          ) : (
            <ul className="file-list">
              {files.map((file, idx) => (
                <li key={idx}>{file}</li>
              ))}
            </ul>
          )}
          <Button onClick={uploadFile}>Upload your first file</Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
