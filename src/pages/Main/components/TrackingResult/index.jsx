import PropTypes from 'prop-types';
import './styles.scss';
import { useState } from 'react';
import MercadoPagoPage from '../mercadopago/index';

function TrackingResult({ data, setSearch, setInvalidCode }) {
    const [whatsapp, setWhatsapp] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showMercadoPagoModal, setShowMercadoPagoModal] = useState(false); // Adicione este estado para controlar o modal

    const formatDate = dateString => new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' });

    const formatPhoneNumber = input => {
        const match = input.replace(/\D/g, '').match(/^(\d{2})(\d{0,1})(\d{0,4})(\d{0,4})$/);
        if (!match) return input;
        let formattedPhoneNumber = `(${match[1]})`;
        if (match[2]) formattedPhoneNumber += ` ${match[2]}`;
        if (match[3]) formattedPhoneNumber += ` ${match[3]}`;
        if (match[4]) formattedPhoneNumber += `-${match[4]}`;
        return formattedPhoneNumber;
    };

    const handlePhoneNumberChange = event => {
        const input = event.target.value;
        const formattedPhoneNumber = formatPhoneNumber(input);
        if (input.length <= 16) setPhoneNumber(formattedPhoneNumber);
    };

    const handleOpenMercadoPagoModal = () => {
        setShowMercadoPagoModal(true);
    };

    const handleCloseMercadoPagoModal = () => {
        setShowMercadoPagoModal(false);
    };

    if (!data || !data.length) return null;

    const uniqueKeys = new Set();

    return (


        <div className='trackingResult flex-center-column'>
            <h1>Dados de Rastreio</h1>
            <ul className="result flex-center-column">
                {data.map(({ data, origem, local, status, id }) => {
                    console.log(local);
                    if (uniqueKeys.has(status)) return null;
                    uniqueKeys.add(status);
                    return (
                        <li key={id} className="result-item flex-center-column">
                            {data && <span><strong>Data:</strong> {formatDate(data)}</span>}
                            {origem && <span><strong>Origem:</strong> {origem}</span>}
                            {local && <span><strong>Local:</strong> {local}</span>}
                            {status && <span><strong>Status:</strong> {status}</span>}
                        </li>
                    );
                })}
            </ul>
            <button className="whatsapp-button flex-center-column" onClick={() => setWhatsapp(true)}>
                <div><i className="fa fa-whatsapp"></i> Receber atualizações no WhatsApp</div>
                {whatsapp && (
                    <div className='box-number-whatsapp flex-center-column'>
                        <input
                            type="tel"
                            className="input-whatsapp"
                            name="whatsapp"
                            placeholder="(XX) 9 XXXX-XXXX"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                            pattern="[0-9]*"
                            autoComplete="off"
                        />
                        <button className="att-button" onClick={handleOpenMercadoPagoModal}>
                            <i className="fa fa-share"></i> Enviar
                        </button>
                        {showMercadoPagoModal &&
                            <MercadoPagoPage
                                handleCloseMercadoPagoModal={handleCloseMercadoPagoModal} />}
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
