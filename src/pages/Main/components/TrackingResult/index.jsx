import PropTypes from 'prop-types';
import './styles.scss';
import { enviarAtualizações } from '../../../../services/enviarAtualizações';
import { useState } from 'react';
import { toastSucess } from '../../../../helpers/ToastSuccess';

function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}


function formatPhoneNumber(input) {
    const numericValue = input.replace(/\D/g, '');
    const match = numericValue.match(/^(\d{2})(\d{0,4})(\d{0,4})$/);

    if (match) {
        const formattedPhoneNumber = `(${match[1]})${match[2] ? ` ${match[2]}` : ''}${match[3] ? `-${match[3]}` : ''}`;
        return formattedPhoneNumber;
    }

    return numericValue;
}

function TrackingResult({ data, setSearch, setInvalidCode }) {
    const [whatsapp, setWhatsapp] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');

    const enviarNumero = () => {
        setWhatsapp(true);
    }

    const handlePhoneNumberChange = (event) => {
        const input = event.target.value;
        const formattedPhoneNumber = formatPhoneNumber(input);

        if (input.length <= 14) {
            setPhoneNumber(formattedPhoneNumber);
        }
    }

    if (!data || !data.length) return null;

    return (
        <div className='trackingResult flex-center-column'>
            <h1>Dados de Rastreio</h1>
            <ul className="result flex-center-column">
                {data.map(({ data, origem, local, status }) => (
                    <li key={status} className="result-item flex-center-column">
                        {data && <span><strong>Data:</strong> {formatDate(data)}</span>}
                        {origem && <span><strong>Origem:</strong> {origem}</span>}
                        {status && <span><strong>Status:</strong> {status}</span>}
                        {local && <span><strong>Local:</strong> {local}</span>}
                    </li>
                ))}
            </ul>
            <button className="whatsapp-button flex-center-column">
                <div onClick={enviarNumero}>
                    <i className="fa fa-whatsapp"></i>
                    Receber atualizações no WhatsApp
                </div>

                {whatsapp && (
                    <div className='box-number-whatsapp flex-center-column'>
                        <input
                            type="tel"
                            className="input-whatsapp"
                            name="whatsapp"
                            placeholder="(XX) XXXX-XXXX"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            pattern="[0-9]*"
                            autoComplete="off"
                        />
                        <button className="att-button" onClick={() => { enviarAtualizações(data, phoneNumber); toastSucess("Dados de rastreios enviados com sucesso");  setPhoneNumber(''); }}>
                            <i className="fa fa-share"></i> Enviar
                        </button>
                    </div>
                )}
            </button>

            <button className="att-button" onClick={() => { setSearch(false); setInvalidCode(false) }}>
                <i className="fa fa-plus-circle"></i> Realizar outra pesquisa
            </button>
        </div>
    );
}

TrackingResult.propTypes = {
    data: PropTypes.array.isRequired,
    setSearch: PropTypes.func.isRequired,
    setInvalidCode: PropTypes.func.isRequired
};

export default TrackingResult;
