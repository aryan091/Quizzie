import React , {useContext} from  'react';
import { Link , useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Sidebar.css';
const Sidebar = ({ onOpenModal }) => {

    const { setUsername, setId, setIsUserLoggedIn } = useContext(UserContext);

  const navigate = useNavigate();
  return (
    <div className="sidebar-container ">
    <div className="sidebar-heading ">
        <Link to="/app/dashboard" className="nav-heading ">QUIZZIE</Link>
    </div>
    <div className="sidebar-menu">
        <ul className="menu-list ">
            <li className="menu-item ">
                <Link to="/app/dashboard" className="menu-link ">Dashboard</Link>
            </li>
            <li className="menu-item ">
                <Link to="/app/analytics" className="menu-link">Analytics</Link>
            </li>
            <li className="menu-item ">
                <div onClick={onOpenModal} className="menu-link ">Create Quiz</div>
            </li>
        </ul>
    </div>
    <div className="sidebar-logout ">
        <div
            className="logout-button "
            onClick={() => {
                localStorage.removeItem('token')
                setIsUserLoggedIn(false)
                setId(null)
                setUsername(null)
                navigate('/');
            }}
        >
            LOGOUT
        </div>
    </div>
</div>
  );
};

export default Sidebar;
