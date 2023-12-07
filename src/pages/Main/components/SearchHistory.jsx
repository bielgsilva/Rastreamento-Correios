// SearchHistory.js
import PropTypes from 'prop-types';
import '../styles.scss';

const SearchHistory = ({ successfulSearchHistory, handleSelectedTrackingCode, handleEdit }) => (
  <div className='searchHistory flex-center-column'>
    <h2>Histórico de Busca</h2>
    <ul className='flex-center-column'>
      {successfulSearchHistory.map((item) => (
        <div className="trackingNames flex-center" key={item.trackingCode}>
          <div></div>
          <li onClick={() => handleSelectedTrackingCode(item.trackingCode)} style={{ cursor: 'pointer' }}>
            {item.trackingName}
          </li>
          <i className="fa fa-pencil-square-o" onClick={() => handleEdit(item.trackingName)} style={{ cursor: 'pointer' }}></i>
        </div>
      ))}
    </ul>
  </div>
);

SearchHistory.propTypes = {
  successfulSearchHistory: PropTypes.array.isRequired,
  handleSelectedTrackingCode: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default SearchHistory;
