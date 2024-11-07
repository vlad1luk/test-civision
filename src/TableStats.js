export default
function TableDeStatistiques ({statistiques, nom, resultat, titre}) {
    return (
      <div className="table-container">
        <h2>{titre}</h2>
        <table className="table-stats">
          <thead>
            <tr>
              <th>{nom}</th>
              <th>{resultat}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(statistiques).map(([activity, count], index) => (
              <tr key={index}>
                <td>{activity}</td>
                <td>{count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };