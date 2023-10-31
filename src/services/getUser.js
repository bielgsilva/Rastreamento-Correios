import api from "../lib/axios";

export const getUser = async (email) => {
    try {
        const response = await api.get("/get-user", { params: { email } });

        return response.data;

    } catch (error) {
        console.log(error.response.data);
    }
};
