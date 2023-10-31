import axios from '../lib/axios';
import UseUser from "../hooks/useUser";

const { setData } = UseUser()

export const submitHanlder = async (event) => {

  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await axios.get(`/rastrear?tracking=${data.tracking}`)

    console.log(response, data.tracking);
    
    if (response.data.message === "OK") {
      setData(response.data.data);
    }
  } catch (error) {
    console.error(error);
  }
};


