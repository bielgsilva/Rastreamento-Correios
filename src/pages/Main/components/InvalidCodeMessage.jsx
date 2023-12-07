import PropTypes from 'prop-types';
import '../styles.scss';

const InvalidCodeMessage = ({ handleNewSearch }) => (
  <>
    <h2>Código de Rastreio inválido</h2>
    <br />
    <button className="att-button" onClick={handleNewSearch}>
      <i className="fa fa-plus-circle"></i> Realizar outra pesquisa
    </button>
  </>
);

InvalidCodeMessage.propTypes = {
  handleNewSearch: PropTypes.func.isRequired,
};

export default InvalidCodeMessage;
