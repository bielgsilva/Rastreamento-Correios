import PropTypes from 'prop-types';
import './styles.scss';


function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
}

function TrackingResult({ data, setSearch }) {
    if (!data || !data.length) return null;

    return (
        <>
            <h1>Dados de Rastreio</h1>
            <br />
            <br />
            <ul className="result flex-center-column">
                {data.map(item => {
                    const { data, origem, local, status } = item;

                    return (
                        <li key={status} className="result-item flex-center-column">
                            {origem && <span><strong>Local:</strong> {origem}</span>}
                            {status && <span><strong>Status:</strong> {status}</span>}
                            {local && <span><strong>Local:</strong> {local}</span>}
                            {data && <span><strong>Data:</strong> {formatDate(data)}</span>}
                        </li>
                    );
                })}

            </ul>
            <br />
            <br />
            <button className="whatsapp-button">
                <i className="fa fa-whatsapp"></i> Receber atualizações no WhatsApp
            </button>
            <br />
            <button className="att-button" onClick={() => setSearch(false)}>
                <i className="fa fa-plus-circle"></i> Realizar outra pesquisa
            </button>

        </>
    );
}

TrackingResult.propTypes = {
    data: PropTypes.array.isRequired,
    setSearch: PropTypes.func.isRequired 

};

export default TrackingResult;
