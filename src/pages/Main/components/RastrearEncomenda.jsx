import PropTypes from 'prop-types';
import '../styles.scss';

const RastrearEncomenda = ({ submitHandler }) => (
  <form onSubmit={submitHandler} className="flex-center-column">
    <h1>Rastrear Encomenda</h1>
    <input type="text" className="form-control" name="tracking" />
    <button type="submit" className="btn btn-primary">
      Rastrear
    </button>
  </form>
);

RastrearEncomenda.propTypes = {
  submitHandler: PropTypes.func.isRequired,
};

export default RastrearEncomenda;