import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">EXCEL ANALYTICS</div>
      <div className="buttons">
        <Link to="/login"><button className="btn-primary">Login</button></Link>
        <Link to="/"><button className="btn-secondary">Register</button></Link>
        {/* <Link to="/upload">Upload Files</Link> */}
      </div>
    </nav>
  )
}