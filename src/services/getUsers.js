import axios from '../lib/axios';

export const fetchGetUsers = async () => {
  try {
    const response = await axios.get('/users/inadimplentes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes inadimplentes:', error);
    return [];
  }
};
export const fetchChargesPaid = async () => {
  try {
    const response = await axios.get('/charges/paid');
    return response;
    
  } catch (error) {
    console.error('Erro ao buscar clientes os clientes em dia:', error);
    return [];
  }
};







export const fetchClientesInadimplentes = async () => {
  try {
    const response = await axios.get('/users/inadimplentes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes inadimplentes:', error);
    return [];
  }
};

export const fetchClientesEmDia = async () => {
  try {
    const response = await axios.get('/clients/paidup');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes os clientes em dia:', error);
    return [];
  }
};
