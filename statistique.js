export default
class Statistique {

    constructor(offres) {
        this.offres = offres;
        this.pasMentionne = "Pas mentionné par l'employeur";
    }

    contratParLieu() {
        let contratParDep = {};

        for (const offre of this.offres) {
            // const { typeContrat } = offre;
            const { libelle } = offre.lieuTravail;
        
            if (!contratParDep[libelle]) 
                contratParDep[libelle] = 0;
            
            contratParDep[libelle]++;
        }

        return contratParDep;
    }

    offresParCommune() {
        let offresParCommune = {};

        for (const offre of this.offres) {
            let { commune } = offre.lieuTravail;

            if(!commune)
                commune = this.pasMentionne;
    
            if (!offresParCommune[commune])
                offresParCommune[commune] = 0;
            
            offresParCommune[commune]++;
        }
        return offresParCommune;
    }

    compterOffreParMois() {
        let offresParMois = {};
        
        for(const offre of this.offres) {
            const dateCreation = new Date(offre.dateCreation);
            const mois = `${dateCreation.getFullYear()}-${dateCreation.getMonth() + 1}`; 

            if (!offresParMois[mois]) 
                offresParMois[mois] = 0;
            
            offresParMois[mois]++;
        }

        return offresParMois;
    }

    offresSelonExperience() {
        let offreExp = {};

        for (const offre of this.offres) {
            const { experienceExige } = offre;

            if(!offreExp[experienceExige])
                offreExp[experienceExige] = 0;

            offreExp[experienceExige]++;
        }

        return offreExp;
    }

    offresParSecteur () {
        let offresParSecteur = {};

        for (const offre of this.offres) {
            let { secteurActiviteLibelle } = offre;

            if (!secteurActiviteLibelle)
                secteurActiviteLibelle = this.pasMentionne;
            
            if (!offresParSecteur[secteurActiviteLibelle]) 
                offresParSecteur[secteurActiviteLibelle] = 0;
            
            offresParSecteur[secteurActiviteLibelle]++;
        }

        return offresParSecteur;
    };


    collecterToutesLesStatistiques() {
        return {
            offresParCommune: this.offresParCommune(),
            contratParDeparetement: this.contratParLieu(),
            offreParMois:this.compterOffreParMois(),
            offreParSecteur:this.offresParSecteur(),
            offreParExperience: this.offresSelonExperience()
        };
    }


}