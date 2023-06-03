import { deleteRide, getAllRide, getARide, updateRide } from './../controller/ride';

import express from 'express';


export default (router: express.Router) => {
    router.get('/Ride/getallRide', getAllRide);
    router.get('/Ride/getRides', getARide);
    router.delete('/Ride/deleteRide', deleteRide);
    router.put('/Ride/updateRide', updateRide);
};