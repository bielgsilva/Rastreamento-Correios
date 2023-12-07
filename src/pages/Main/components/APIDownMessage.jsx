import PropTypes from 'prop-types';
import '../styles.scss';

const APIDownMessage = ({ handleNewSearch }) => (
  <>
    <h2>API fora do ar...</h2>
    <h3>Entre em contato com o Desenvolvedor</h3>
    <br />
    <button className="att-button" onClick={handleNewSearch}>
      <i className="fa fa-plus-circle"></i> Realizar outra pesquisa
    </button>
  </>
);

APIDownMessage.propTypes = {
  handleNewSearch: PropTypes.func.isRequired,
};

export default APIDownMessage;
