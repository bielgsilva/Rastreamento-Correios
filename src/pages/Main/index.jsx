import { useEffect } from 'react';
import './styles.scss';
import TrackingResult from './components/TrackingResult';
import useUser from '../../hooks/useUser';
import axios from '../../lib/axios';

function App() {
  const {
    data,
    setData,
    search,
    setSearch,
    invalidCode,
    setInvalidCode,
    apiIsDown,
    setApiIsDown,
    loading,
    setLoading,
    clearPreviousSearch,
    setClearPreviousSearch,
    successfulSearchHistory,
    setSuccessfulSearchHistory,
    emptyHistory,
    setEmptyHistory,
  } = useUser();

  
  const localStorageKey = 'searchHistory';
  useEffect(() => {
    const savedHistory = localStorage.getItem(localStorageKey);
    if (savedHistory) {
      setSuccessfulSearchHistory(JSON.parse(savedHistory));
      setEmptyHistory(false)
    }
  }, [setEmptyHistory, setSuccessfulSearchHistory]);



  const updateSuccessfulSearchHistory = (trackingCode) => {
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

  const setSelectedTrackingCode = async (trackingCode) => {
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




  const handleNewSearch = () => {
    setClearPreviousSearch(false);
    setSearch(false);
    setLoading(false);
  };

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
    let data = Object.fromEntries(formData);

    try {
      const response = await axios.get(`/rastrear?tracking=${data.tracking}`);
      const statusList = response.data.result.status_list;
      setData(statusList);

      if (statusList.length === 0) {
        setInvalidCode(true);
      } else {
        updateSuccessfulSearchHistory(data.tracking);
      }
    } catch (error) {
      setApiIsDown(true);
      console.error("Erro ao acessar API", error);
    } finally {
      setLoading(false);
    }
  };

  const HistoricoDeBusca = () => (
    <>
      <h2>Histórico de Busca</h2>
      <ul>
        {successfulSearchHistory.map((trackingCode) => (
          <li key={trackingCode} onClick={() => setSelectedTrackingCode(trackingCode)} style={{ cursor: 'pointer' }}>
            {trackingCode}
          </li>
        ))}
      </ul>
    </>
  );

  const InvalidCode = () => (
    <>
      <h2>Código de Rastreio inválido</h2>
      <br />
      <button className="att-button" onClick={handleNewSearch}>
        <i className="fa fa-plus-circle"></i> Realizar outra pesquisa
      </button>
    </>
  );

  const APIDown = () => (
    <>
      <h2>API fora do ar...</h2>
      <h3>Entre em contato com o Desenvolvedor</h3>
      <br />
      <button className="att-button" onClick={handleNewSearch}>
        <i className="fa fa-plus-circle"></i> Realizar outra pesquisa
      </button>
    </>
  );

  const RastrearEncomenda = () => (
    <form onSubmit={submitHandler} className="flex-center-column">
      <h1>Rastrear Encomenda</h1>
      <input type="text" className="form-control" name="tracking" />
      <button type="submit" className="btn btn-primary">
        Rastrear
      </button>
    </form>
  );

  return (
    <div className="container flex-center-column overlay">
      <div className="trackingContent flex-center-column">
        {loading && <h2>Carregando...</h2>}
        {!search && !loading && !clearPreviousSearch && <RastrearEncomenda />}
        {search && !loading && <TrackingResult data={data} setSearch={setSearch} setInvalidCode={setInvalidCode} />}
        {search && invalidCode && !loading && <InvalidCode />}
        {search && apiIsDown && !loading && <APIDown />}
      </div>

      <div className="trackingContent flex-center-column">
        {!emptyHistory ? <HistoricoDeBusca /> : <h3>Histórico de busca está vazio</h3>}
      </div>
    </div>
  );
}

export default App;
