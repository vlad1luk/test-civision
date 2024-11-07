import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import Statistique from './statistique.js';

dotenv.config();
const app = express();
const api = 'https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search';
const tokenUrl = process.env.TOKEN_URL;

const PORT = process.env.PORT || 3000;
const id_client = process.env.ID_CLIENT;
const cle_secrete = process.env.SECRET_KEY;


app.use(cors());
app.use(helmet()); 
app.use(express.json({ limit: '10mb' }));

async function obtenirJetonAcces() {
  try {
    const response = await axios.post(
      tokenUrl,
      new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: id_client,
        client_secret: cle_secrete,
        scope: 'api_offresdemploiv2 o2dsoffre'
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Jeton d\'accès obtenu :', response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error('Erreur lors de la récupération du jeton d\'accès :', error.response?.data || error.message);
  }
}

const getOffres = async (url) => {
  const accessToken = await obtenirJetonAcces();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la requête API:', error);
  }
};

app.get('/', async (req, res, next) => {
  try {
    const offres = await getOffres(api);
    res.json(offres.resultats);
  } catch (error) {
    next(error);
  }
});

app.get('/date', async (req, res, next) => {
  const { min, max } = req.query;
  const formattedMin = formatDate(min);
  const formattedMax = formatDate(max);
  const url = `${api}?minCreationDate=${encodeURIComponent(formattedMin)}&maxCreationDate=${encodeURIComponent(formattedMax)}`;
  
  try {
    if (min < max) {
      const offres = await getOffres(url);
      res.json(offres.resultats);
    } else {
      res.json({'error' : 'Les dates entrées ne sont pas valides'});
    }
  } catch (error) {
    next(error);
  }
});

app.post('/api/stats', (req, res) => {
  const { data: offres } = req.body;
  const statistique = new Statistique(offres);
  res.json(statistique.collecterToutesLesStatistiques());
});

const formatDate = (date) => `${date}T00:00:00Z`;

app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Une erreur est survenue. Veuillez réessayer plus tard.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
