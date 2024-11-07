export default
function SelectList ({opt, setOpt}) {
    const options = [
      {value: -1, label:"Selectionnez une statistique à afficher"},
      { value: 0, label: "Offres par secteur" },
      { value: 1, label: "Expérience éxigée" },
      { value: 2, label: "Quantité offres selon le mois" },
      { value: 3, label: "Contrats par département" },
      { value: 4, label: "Offres par commune" }
  ];
  
    return (
      <div>
        <select id="select" value={opt} onChange={(ev) => setOpt(ev.target.value)}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };