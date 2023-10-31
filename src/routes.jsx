import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { getItem } from './routes/storage';
import UseUser from './hooks/useUser';
import Main from './pages/Main';
import PropTypes from 'prop-types'; 

const isAuthenticated = getItem('token');

function ProtectedRoutes({ redirectTo }) {
  const { setIsAuthenticated } = UseUser();
  setIsAuthenticated(true);
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <Main />} />

      <Route element={<ProtectedRoutes redirectTo="" />}>

      </Route>
    </Routes>
  );
}

ProtectedRoutes.propTypes = {
  redirectTo: PropTypes.string.isRequired,
};

export default MainRoutes;
