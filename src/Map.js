import { serveurUrl, effacerDonnees } from "./App.js";
import Marquers from "./Marqueur.js";
import { MapContainer, TileLayer } from "react-leaflet";

export default
function MapComponent ({ jobOffers, getOffres, setOption, setOffres, setStats, setIsPickerOpened }) {
    return (
      <div className="map-container">
        <div className="map-buttons">
          <button className="today-btn" onClick={ async () => 
          { 
            const offres = await getOffres(serveurUrl);
            setOffres(offres);
          } }>
            Offres du jour
          </button>
          <button className="period-btn" onClick={() => setIsPickerOpened(true)}>
            Choisir une date
          </button>
          <button className="erase-btn" onClick={() => {
            effacerDonnees(setOption,setOffres,setStats);
          }}>
            Tout effacer
          </button>
        </div>
  
        <MapContainer
          center={[46.603354, 1.888334]}
          zoom={6}
          zoomControl={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marquers jobOffers={jobOffers} />
        </MapContainer>
      </div>
    );
  };