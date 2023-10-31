import { toastSucess } from "../helpers/ToastSuccess";
import { api } from "../lib/axios";

export const clientRegister = async (clientData, token, onClose) => {
  try {
    const response = await api.post("/clients/register", clientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toastSucess("Cadastrado com sucesso");
    onClose();
    return response;
  } catch (error) {
    const { message } = error.response.data;
    return message;
  }
};
