import { Chart } from "react-google-charts";

const convertirStatsPourChart = (stats) => {
    
    const convertirExp = {'D':"Débutant", 'S':"Éxperience souhaitée", 'E':"Éxperience éxigée"};
    const chartData = [["Exigence", "Nombre d'Offres"]];
    for (const [experience, count] of Object.entries(stats)) {
      chartData.push([convertirExp[experience], count]);
    }
    return chartData;
};


export
const PieCharStat = ({data}) => {
    const options = {
      backgroundColor: "#f9f9f9",
      pieHole: 0.4,
      legend: { position: "bottom", textStyle: { color: "#333", fontSize: 14 } },
      chartArea: { width: "90%", height: "80%" },
      slices: [
        { color: "#36a276" },
        { color: "#63b98a" },
        { color: "#89d8a3" },
        { color: "#b3e9c5" },
        { color: "#d8f4e2" },
      ],
    };
    data = convertirStatsPourChart(data);
    return (
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        height={"400px"}
      />
    );
  }