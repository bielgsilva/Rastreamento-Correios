import PropTypes from 'prop-types';

const SearchHistory = ({ successfulSearchHistory, handleSelectedTrackingCode, handleEdit, handleDeleteTrackingName }) => (
  <>
    <h2>Histórico de Busca</h2>
    <ul >
      {successfulSearchHistory.map((item) => (
        <div className="trackingNames flex-center-column" key={item.trackingCode}>
          <div className='trackingNames flex-center'>
            <i className="fa  fa-times-circle" onClick={() => handleDeleteTrackingName(item.trackingName)} style={{ cursor: 'pointer' }}></i>
            <li onClick={() => handleSelectedTrackingCode(item.trackingCode)} style={{ cursor: 'pointer' }}>
              {item.trackingName}
            </li>
            <i className="fa fa-pencil-square-o" onClick={() => handleEdit(item.trackingName)} style={{ cursor: 'pointer' }}></i>
          </div>
          <hr />
        </div>

      ))}
    </ul>
  </ >

);

SearchHistory.propTypes = {
  successfulSearchHistory: PropTypes.array.isRequired,
  handleSelectedTrackingCode: PropTypes.func.isRequired,
  handleDeleteTrackingName: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
};

export default SearchHistory;
