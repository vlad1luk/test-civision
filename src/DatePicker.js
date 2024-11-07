import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { serveurUrl } from "./App.js";

export default
function DateRangePicker ({ getOffres, setIsPickerOpened, setOffres, setStats }) {
    const [minDate, setMinDate] = useState("");
    const [maxDate, setMaxDate] = useState("");
  
    return (
      <div className="date-range-picker">
        <div className="picker-header">
          <h4>Sélectionnez une période</h4>
          <FontAwesomeIcon
            onClick={() => setIsPickerOpened(false)}
            icon={faTimes}
            className="close-window"
          />
        </div>
  
        <div className="date-inputs">
          <label>
            De
            <input
              type="date"
              value={minDate}
              onChange={ (e) => setMinDate(e.target.value) }
            />
          </label>
          <label>
           À
            <input
              type="date"
              value={maxDate}
              onChange={(e) => setMaxDate(e.target.value)}
            />
          </label>
        </div>
        <button className="submit-button" onClick={async () => {
          if(minDate && maxDate && minDate < maxDate) {
            const offres = await getOffres(`${serveurUrl}/date?min=${minDate}&max=${maxDate}`);
            if (offres) {
              setIsPickerOpened(false);
              setStats();
              setOffres(offres);
            }
          } else {
            alert('Veuillez selectionner des dates appropriées');
          }
          }}>
          Rechercher
        </button>
      </div>
    );
  };