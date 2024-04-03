/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import './styles.scss'
import pixQRCODE from '../../../../assets/pix.jpg'


const MercadoPagoPage = ({ handleCloseMercadoPagoModal }) => {
  const [pix, setPix] = useState(false);

  useEffect(() => {
    document.body.classList.add('modal-open');
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);



  return (
    <div className="mercadopagoModal ">
      <div className="mercadopagoModal-container flex-center-column ">
        {!pix && (
          <>
            <button className="close-button" onClick={handleCloseMercadoPagoModal}>X</button>
            <h3>Receba as Atualizações do seu pedido via WhatsApp</h3>
            <h4>Por apenas R$0,99</h4>
            <button onClick={() => {
              setPix(true)
            }}>Gerar QR Code</button>
          </>
        )}

        {pix && (
          <>
            <h3>Pagamento com PIX</h3>
            <h5>Leia com o app do banco</h5>
            <img src={pixQRCODE} alt="" style={{ width: "200px" }} />
            <h3>Total: R$0,99 centavos.</h3>
          </>
        )}
      </div>
    </div >
  );
};

export default MercadoPagoPage;