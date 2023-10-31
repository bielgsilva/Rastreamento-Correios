import { api } from "../lib/axios";

export const getUserLogged = async (token) => {
  try {
    const response = await api.get("/users/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("name", response.data.name);

    return response.data;
  } catch (error) {
    console.log(error.response.data);
    if (error.response.data === "jwt expired") {
      return { redirectToLogin: true };
    }
  }
};
