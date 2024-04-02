import { useReducer, useState, useEffect } from "react";
import axios from "axios";
import { initMercadoPago } from "@mercadopago/sdk-react";
import './styles.scss'
import PropTypes from 'prop-types';


const api = axios.create({
  baseURL: "https://api.mercadopago.com",
});

api.interceptors.request.use(async (config) => {
  const token = "APP_USR-882753531531363-040120-243a956d4d02aacc804f6e986881b29e-717124142";
  config.headers.Authorization = `Bearer ${token}`;
  console.log(config)
  return config;
});

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

initMercadoPago("APP_USR-882753531531363-040120-243a956d4d02aacc804f6e986881b29e-717124142");

const MercadoPagoPage = ({ handleCloseMercadoPagoModal }) => {
  const [formData, setFormdata] = useReducer(formReducer, {
    name: '',
    email: '',
    cpf: '',
  });
  const [responsePayment, setResponsePayment] = useState(false);
  const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);


  const handleChange = (event) => {
    setFormdata({
      name: event.target.name,
      value: event.target.value,
      cpf: event.target.cpf
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {


      const body = {
        transaction_amount: 1,
        description: "Produto teste de desenvolvimento",
        payment_method_id: "pix",
        payer: {
          email: formData.email,
          first_name: formData.name,
          identification: {
            type: "CPF",
            number: formData.cpf,
          },
        },
        notification_url: "https://eorpjcvcjvhqnq6.m.pipedream.net",
      };

      const response = await api.post("/v1/payments", body);

      console.log(response)

      setResponsePayment(true);

      setLinkBuyMercadoPago(response.data.point_of_interaction.transaction_data.ticket_url);

      setIsLoading(false);

    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="mercadopagoModal">
      {isLoading && <div className="loading">Carregando...</div>}

      {!isLoading && !responsePayment && (
        <div className="mercadopagoModal-inputs flex-center-column">
          <button className="close-button" onClick={handleCloseMercadoPagoModal}>X</button>
          <p>Pagamento com PIX</p>
          <form onSubmit={handleSubmit} className="flex-center-column">
            <div className="flex-center-column">
              <label>E-mail</label>
              <input onChange={handleChange} name="email" value={formData.email} />
            </div>

            <div className="flex-center-column">
              <label>Nome</label>
              <input onChange={handleChange} name="name" value={formData.name} />
            </div>

            <div className="flex-center-column">
              <label>CPF</label>
              <input onChange={handleChange} name="cpf" value={formData.cpf} />
            </div>

            <button type="submit">Gerar QR Code</button>
          </form>

        </div>


      )}
      {responsePayment && (
        <>
          {linkBuyMercadoPago && (
            <iframe src={linkBuyMercadoPago} width="100%" height="100%" title="link_buy" />
          )}
        </>
      )}
    </div>
  );
};

MercadoPagoPage.propTypes = {
  handleCloseMercadoPagoModal: PropTypes.func.isRequired
};

export default MercadoPagoPage;
