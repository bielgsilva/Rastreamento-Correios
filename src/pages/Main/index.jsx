import { useEffect } from 'react';
import './styles.scss';
import TrackingResult from './components/TrackingResult';
import useUser from '../../hooks/useUser';
import axios from '../../lib/axios';
import EditModal from './components/EditModal/index';
import SearchHistory from './components/SearchHistory';
import InvalidCodeMessage from './components/InvalidCodeMessage';
import APIDownMessage from './components/APIDownMessage';
import RastrearEncomenda from './components/RastrearEncomenda';

function App() {
  const {
    data, setData,
    search, setSearch,
    invalidCode, setInvalidCode,
    apiIsDown, setApiIsDown,
    loading, setLoading,
    clearPreviousSearch, setClearPreviousSearch,
    successfulSearchHistory, setSuccessfulSearchHistory,
    emptyHistory, setEmptyHistory,
    editModalOpen, setEditModalOpen,
    selectedTrackingCode, setSelectedTrackingCode,

  } = useUser();

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSuccessfulSearchHistory(JSON.parse(savedHistory));
      setEmptyHistory(false);
    }
  }, [setEmptyHistory, setSuccessfulSearchHistory]);

  const submitHandler = async (event) => {
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
        const trackingName = formDataObject.tracking;
        handleUpdateSuccessfulSearchHistory(formDataObject.tracking, trackingName);
        console.log(formDataObject.tracking, trackingName);
      }
    } catch (error) {
      setApiIsDown(true);
      console.error("Erro ao acessar API", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedTrackingCode = async (trackingCode) => {
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
    } finally {
      setLoading(false);
    }
  };


  const handleUpdateSuccessfulSearchHistory = (trackingCode, trackingName) => {

    if (!successfulSearchHistory.some(item => item.trackingCode === trackingCode)) {

      setSuccessfulSearchHistory((prevHistory) => {
        const updatedHistory = [...prevHistory, { trackingCode, trackingName }];
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
        return updatedHistory;
      });

      setEmptyHistory(false);
    }
  };


  const handleEdit = (trackingName) => {
    console.log(trackingName);
    setSelectedTrackingCode(trackingName);
    setEditModalOpen(true);
  };

  const handleDeleteTrackingName = (trackingName) => {
    const updatedHistory = successfulSearchHistory.filter(item => item.trackingName !== trackingName);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    setSuccessfulSearchHistory(updatedHistory);

    if (updatedHistory.length === 0) {
      setEmptyHistory(true);
    }

  };


  const handleSaveEdit = (editedTrackingName) => {
    setSuccessfulSearchHistory((prevHistory) => {
      console.log(prevHistory);
      const updatedHistory = prevHistory.map((item) =>

        item.trackingName === selectedTrackingCode
          ? { trackingCode: item.trackingCode, trackingName: editedTrackingName }
          : item
      );
      localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const handleNewSearch = () => {
    setClearPreviousSearch(false);
    setSearch(false);
    setLoading(false);
  };


  return (
    <div className="container flex-center-column overlay">
      {!editModalOpen &&
        <>
          <div className="trackingContent flex-center-column">
            {loading && <h2>Carregando...</h2>}
            {!search && !loading && !clearPreviousSearch && <RastrearEncomenda submitHandler={submitHandler} />}
            {search && !loading && <TrackingResult data={data} setSearch={setSearch} setInvalidCode={setInvalidCode} />}
            {search && invalidCode && !loading && <InvalidCodeMessage handleNewSearch={handleNewSearch} />}
            {search && apiIsDown && !loading && <APIDownMessage handleNewSearch={handleNewSearch} />}
          </div>

          <div className="trackingContent flex-center-column">
            {!emptyHistory
              ?
              <SearchHistory
                successfulSearchHistory={successfulSearchHistory}
                handleSelectedTrackingCode={handleSelectedTrackingCode}
                handleEdit={handleEdit}
                handleDeleteTrackingName={handleDeleteTrackingName}
              />

              : <h3>Histórico de busca está vazio</h3>}
          </div>
        </>
      }

      {editModalOpen &&
        <EditModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          handleSaveEdit={handleSaveEdit}
          selectedTrackingCode={selectedTrackingCode}
        />
      }
    </div>
  );
}

export default App;