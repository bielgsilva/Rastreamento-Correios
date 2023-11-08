import axios from '../lib/axios';

export const enviarAtualizações = async (data) => {
  console.log(data);
  try {
    const response = await axios.get(`/whatsapp?data=${JSON.stringify(data)}`);
    console.log(response);


  } catch (error) {
    console.error(error);
  }
};

