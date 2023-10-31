import "./styles.scss";
import TrackingResult from "./components/TrackingResult";
import UseUser from "../../hooks/useUser";
import axios from '../../lib/axios';

function App() {
  const { data, setData, search, setSearch } = UseUser()

  const submitHanlder = async (event) => {

    event.preventDefault();
    setSearch(true)

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.get(`/rastrear?tracking=${data.tracking}`)
      setData(response.data.result.status_list);
      console.log(response.data.result.status_list);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container flex-center-column overlay">
      <div className="trackingContent flex-center-column">
        {!search &&
          <form onSubmit={submitHanlder} className="flex-center-column">
            <h1>Rastrear Encomenda</h1>

            <input type="text" className="form-control" name="tracking" />

            <button type="submit" className="btn btn-primary">
              Rastrear
            </button>
          </form>
        }

        {search &&
          <TrackingResult data={data}  setSearch={setSearch}/>
        }

      </div>
    </div>
  );
}

export default App;