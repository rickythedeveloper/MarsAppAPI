export enum RoverName {
    curiosity = 'curiosity',
    opportunity = 'opportunity',
    spirit = 'spirit'
}

export enum RoverCameraType {
    FHAZ,
    RHAZ,
    MAST,
    CHEMCAM,
    MAHLI,
    MARDI,
    NAVCAM,
    PANCAM,
    MINITES
}

export interface RoverCameraData {
    id: number,
    name: string,
    rover_id: number,
    full_name: string
}

export interface RoverData {
    id: number,
    name: string,
    landing_date: string,
    launch_date: string,
    status: string
}

export interface RoverPhotoData {
    id: number,
    sol: number,
    camera: RoverCameraData,
    img_src: string,
    earth_data: string,
    rover: RoverData
}