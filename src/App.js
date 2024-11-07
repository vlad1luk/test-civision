import "./App.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import TableDeStatistiques from "./TableStats.js";
import DateRangePicker from "./DatePicker.js";
import MapComponent from "./Map.js";
import SelectList from "./SelectList.js";
import { PieCharStat } from "./PieChart.js";

export const serveurUrl = "http://localhost:3019";
export const effacerDonnees = (setOption,setOffres,setStats) => {
  setOption(-1);
  setOffres([]);
  setStats();
};


const genererStatistiques = async (url, offres) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: offres }), 
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de récupération des statistiques:", error);
  }
};

const recupererOffres = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erreur de récupération des données:", error);
  }
};



function App() {
  const [offres, setOffres] = useState([]);
  const [option, setOption] = useState(-1);
  const [stats, setStats] = useState();
  const [estPickerOuvert, setPickerOuvert] = useState(false);

  const statisticsParOpt = {
    0: <TableDeStatistiques statistiques={stats && stats.offreParSecteur} nom={"Secteur"} resultat={"Quantité d'offres"} titre={"Répartition des Offres par Secteurs"}/>,
    1: <PieCharStat data={stats && stats.offreParExperience} option={"Offres par exp"} />,
    2: <TableDeStatistiques statistiques={stats && stats.offreParMois} nom={"Année-Mois"} resultat={"Quantité d'offres"} titre={"Répartition des Offres par Mois de création"}/> ,
    3: <TableDeStatistiques statistiques={stats && stats.contratParDeparetement} nom={"Lieu de travail"} resultat={"Quantité de contrats"} titre={"Répartition des contrats par département"}/> ,
    4: <TableDeStatistiques statistiques={stats && stats.offresParCommune} nom={"Commune"} resultat={"Nombre d'offres"} titre={"Nombre d'offres d'emploi par commune"} />
  };

  return (
    <div className="App">
      {estPickerOuvert && (
        <DateRangePicker
          getOffres={recupererOffres}
          setIsPickerOpened={setPickerOuvert}
          setOffres={setOffres}
          setStats={setStats}
        />
      )}

      <div className="main-container">
        <MapComponent
          jobOffers={offres}
          getOffres={recupererOffres}
          setOption={setOption}
          setOffres={setOffres}
          setStats={setStats}
          setIsPickerOpened={setPickerOuvert}
        />

      {offres.length>0 && 
      ( 
        <div className="sidebar">
            <button
                className="stats-button"
                onClick={async () => {
                  let statistics = await genererStatistiques(
                    `${serveurUrl}/api/stats`,
                    offres
                  );
                  console.log(statistics);
                  setStats(statistics);
                }}
              >
              Générer des statistiques
            </button>
          {stats && (
            <div className="select-list-container">
              <SelectList opt={option} setOpt={setOption} />
              {statisticsParOpt[option]}
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
}




export default App;


