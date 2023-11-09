import axios from '../lib/axios';

export const enviarAtualizações = async (data, phoneNumber) => {
  try {
    const response = await axios.get(`/whatsapp?data=${JSON.stringify(data)}&phoneNumber=${phoneNumber}`);
    console.log(response);


  } catch (error) {
    console.error(error);
  }
};

