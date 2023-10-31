import './styles.css';
import useUser from '../../../hooks/useUser'
import { useNavigate } from 'react-router-dom';


const SideBar = () => {
  const navigate = useNavigate();
  const {} = useUser()

  return (
    <div className="sidebar flex-center-column ">

      
    </div>
  );
};

export default SideBar;
