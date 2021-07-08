import express from "express";
const cors = require('cors')
import axios from 'axios';
import {RoverCameraType, RoverName, RoverPhotoData} from "./rover";

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();

const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin: any, callback: any) {
        const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    }
};

router.get('/test', (req, res) => res.send('Hello world !'));
router.get('/rovers/:roverName', cors(corsOptions), async (req, res) => {
    const roverName: string = req.params.roverName
    const sol = Number(req.query.sol) || 1000
    const data = await getRoverPhotoData(roverName, '', sol)
    res.send(data)
})

router.get('/rovers/:roverName/photos', cors(corsOptions), async (req, res) => {
    const roverName: string = req.params.roverName
    const sol = Number(req.query.sol) || 1000
    const data = await getRoverPhotoData(roverName, '', sol)
    res.send(data)
})

router.get('/rovers/:roverName/photos/:cameraType', cors(corsOptions), async (req, res) => {
    const roverName: string = req.params.roverName
    const cameraType: string = String(req.params.cameraType)
    const sol = Number(req.query.sol) || 1000
    const data = await getRoverPhotoData(roverName, cameraType, sol)
    res.send(data)
})

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

async function getRoverPhotoData(roverName: string, cameraType: string, sol: number): Promise<RoverPhotoData[] | string> {
    const validRoverNames: string[] = Object.values(RoverName)
    if (!(validRoverNames.includes(roverName))) {
        return 'Check the rover name!'
    }
    const cameraTypeUppercase = cameraType.toUpperCase()
    if (cameraTypeUppercase !== '' && !(cameraTypeUppercase in RoverCameraType)) {
        return 'Check the rover camera type!'
    }
    let cameraTypeQuery = cameraTypeUppercase === '' ? '' : `camera=${cameraTypeUppercase}`
    const apiKey = 'aRWUnNqpH11eSQvCm114SVuAnhMFivU6KLWFgF7k'
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&${cameraTypeQuery}&api_key=${apiKey}`
    const response = await axios.get(url)
    const data: RoverPhotoData[] = response.data
    return data
}