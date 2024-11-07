import { Marker, Popup } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import Offre from "./Offre.js";

export default
function Marquers ({ jobOffers }) {
    const marqueur = new L.Icon({
        iconUrl: markerIcon,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: markerShadow,
        shadowSize: [41, 41],
      });
    return jobOffers.map((offre, index) => {
      const { latitude, longitude } = offre.lieuTravail;
      if (latitude && longitude) {
        return (
          <Marker key={index} position={[latitude, longitude]} icon={marqueur}>
            <Popup>
              <Offre offre={offre} />
            </Popup>
          </Marker>
        );
      }
      return null;
    });
  };