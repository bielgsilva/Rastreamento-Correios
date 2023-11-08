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
    apiIsDown, setApiIsDown,
    loading,
    setLoading,
    clearPreviousSearch,
    setClearPreviousSearch
  } = useUser();

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
      <h3>Aguarde ou entre em contato com o Desenvolvedor</h3>
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

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.get(`/rastrear?tracking=${data.tracking}`);
      const statusList = response.data.result.status_list;
      setData(statusList);

      if (statusList.length === 0) {
        setInvalidCode(true);
      }
    } catch (error) {
      setApiIsDown(true);

      console.error("Erro ao acessar API", error);

      return [];
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container flex-center-column overlay">
      <div className="trackingContent flex-center-column">
        {loading && <h2>Carregando...</h2>}

        {!search && !loading && !clearPreviousSearch && <RastrearEncomenda />}

        {search && !loading && <TrackingResult data={data} setSearch={setSearch} />}

        {search && invalidCode && !loading && <InvalidCode />}

        {search && apiIsDown && !loading && <APIDown />}
      </div>
    </div>
  );
}

export default App;
