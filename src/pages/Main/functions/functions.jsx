
export const updateSuccessfulSearchHistory = (trackingCode, successfulSearchHistory, setSuccessfulSearchHistory, setEmptyHistory) => {
  if (!successfulSearchHistory.includes(trackingCode)) {
    setSuccessfulSearchHistory((prevHistory) => {
      const updatedHistory = [...prevHistory, trackingCode];
      localStorage.setItem(localStorageKey, JSON.stringify(updatedHistory));
      console.log(updatedHistory);
      return updatedHistory;
    });
    setEmptyHistory(false);
  }
};

export const handleSelectedTrackingCode = async (trackingCode, setSearch, setInvalidCode, setLoading, setClearPreviousSearch, setEmptyHistory, axios, setData, setApiIsDown) => {
  setSearch(true);
  setInvalidCode(false);
  setLoading(true);
  setClearPreviousSearch(false);
  setEmptyHistory(false);

  try {
    const response = await axios.get(`/rastrear?tracking=${trackingCode}`);
    const statusList = response.data.result.status_list;
    setData(statusList);

    if (statusList.length === 0) {
      setInvalidCode(true);
    }
  } catch (error) {
    setApiIsDown(true);
    console.error("Erro ao acessar API", error);
  } finally {
    setLoading(false);
  }
};

export const handleEdit = (trackingCode, setSelectedTrackingCode, setEditModalOpen) => {
  setSelectedTrackingCode(trackingCode);
  setEditModalOpen(true);
};

export const handleSaveEdit = (editedTrackingCode, selectedTrackingCode, setSuccessfulSearchHistory, localStorageKey) => {
  setSuccessfulSearchHistory((prevHistory) => {
    const updatedHistory = prevHistory.map((code) =>
      code === selectedTrackingCode ? editedTrackingCode : code
    );
    localStorage.setItem(localStorageKey, JSON.stringify(updatedHistory));
    return updatedHistory;
  });
};

export const handleNewSearch = (setClearPreviousSearch, setSearch, setLoading) => {
  setClearPreviousSearch(false);
  setSearch(false);
  setLoading(false);
};

export const submitHandler = async (event, setSearch, setInvalidCode, setLoading, setClearPreviousSearch, setData, axios, clearPreviousSearch, setApiIsDown, setEmptyHistory, successfulSearchHistory, updateSuccessfulSearchHistory) => {
  event.preventDefault();
  setSearch(true);
  setInvalidCode(false);
  setLoading(true);

  if (clearPreviousSearch) {
    setData([]);
    setClearPreviousSearch(false);
  }

  let formData = new FormData(event.target);
  let formDataObject = Object.fromEntries(formData);

  try {
    const response = await axios.get(`/rastrear?tracking=${formDataObject.tracking}`);
    const statusList = response.data.result.status_list;
    setData(statusList);

    if (statusList.length === 0) {
      setInvalidCode(true);
    } else {
      updateSuccessfulSearchHistory(formDataObject.tracking, successfulSearchHistory, setSuccessfulSearchHistory, setEmptyHistory);
    }
  } catch (error) {
    setApiIsDown(true);
    console.error("Erro ao acessar API", error);
  } finally {
    setLoading(false);
  }
};
