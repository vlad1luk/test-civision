export default
function Offre ({ offre }) {
    const { intitule, description } = offre;
    return (
      <div>
        <div>
          <h3 className="emploi">{intitule}</h3>
          <p>Type de contrat : <b>{offre.typeContrat}</b></p>
        </div>
        
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <p>Crée le <b>{new Date(offre.dateCreation).toLocaleDateString('en-CA')}</b></p>
          <p>Actualisée le <b>{new Date(offre.dateActualisation).toLocaleDateString('en-CA')}</b></p>
        </div>
       <hr/>
        <div className="description">{description}</div>
        <p>Commune: {offre.lieuTravail.commune}</p>
        <button>Appliquer</button>
      </div>
    );
  };