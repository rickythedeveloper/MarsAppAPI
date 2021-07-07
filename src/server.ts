import express from "express";
import axios from 'axios';

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
router.get('/rovers/:roverName', async (req, res) => {
    // const roverNames =  ['curiosity', 'opportunity', 'spirit']
    const roverName: string = req.params.roverName
    const apiKey = 'aRWUnNqpH11eSQvCm114SVuAnhMFivU6KLWFgF7k'
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=1000&api_key=${apiKey}`
    const response = await axios.get(url)
    const data = response.data
    res.send(data)
})
app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});