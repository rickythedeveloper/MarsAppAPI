import express from "express";
import axios from 'axios';
import {RoverCameraType, RoverName, RoverPhotoData} from "./rover";

const app = express();
const port = 8000;

app.use(express.json());
const router = express.Router();
router.get('/test', (req, res) => res.send('Hello world !'));
router.get('/rovers/:roverName', async (req, res) => {
    const roverName: string = req.params.roverName
    const data = await roverPhotoData(roverName, '')
    res.send(data)
})

router.get('/rovers/:roverName/photos', async (req, res) => {
    const roverName: string = req.params.roverName
    const data = await roverPhotoData(roverName, '')
    res.send(data)
})

router.get('/rovers/:roverName/photos/:cameraType', async (req, res) => {
    const roverName: string = req.params.roverName
    const cameraType: string = req.params.cameraType
    const data = await roverPhotoData(roverName, cameraType)
    res.send(data)
})

app.use('/', router);

app.listen(port, () => {
    console.log(`Test backend is running on port ${port}`);
});

async function roverPhotoData(roverName: string, cameraType: string): Promise<RoverPhotoData[] | string> {
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
    const sol = 1000
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&${cameraTypeQuery}&api_key=${apiKey}`
    const response = await axios.get(url)
    const data: RoverPhotoData[] = response.data
    return data
}