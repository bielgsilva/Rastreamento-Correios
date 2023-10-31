import { toastSucess } from "../helpers/ToastSuccess";
import { toastError } from "../helpers/ToastError";
import api from "../lib/axios"

export const clientEdit = async (clientData, id, token) => {
  try {

    const response = await api.put(`/users/edit/profile/${id}`, clientData);

    toastSucess("Dados atualizados com sucesso");

    return response.data.client;

  } catch (error) {
    toastError("E-mail já cadastrado")
    return null;
  }
};
