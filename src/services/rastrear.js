import axios from "../lib/axios";
import useUser from "../hooks/useUser"


export const rastrear = async (event) => {
  const {
    setData,
    setSearch,
    setInvalidCode,
    setLoading,
    clearPreviousSearch,
    setClearPreviousSearch
  } = useUser();

  event.preventDefault();
  setSearch(true);
  setInvalidCode(false);
  setLoading(true);

  if (clearPreviousSearch) {
    setData([]);
    setClearPreviousSearch(false);
  }

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await axios.get(`/rastrear?tracking=${data.tracking}`);

    console.log(response);
    const statusList = response.data.result.status_list;

    setData(statusList);

    if (statusList.length === 0) {
      setInvalidCode(true);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
