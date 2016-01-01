import { Router } from 'express';

const router = Router()

const getHome = (req, res) => {
    res.send('Dies ist die Seite von EduArt ...Vielen Dank, dass Sie sich bei uns weiterbilden wollen.');
  };


export default getHome
