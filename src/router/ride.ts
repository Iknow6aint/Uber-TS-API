
import { deleteRide, getAllRide, getARide, updateRide, cancelRide } from './../controller/ride';

import express from 'express';


export default (router: express.Router) => {
    router.get('/Ride/getallRide', getAllRide);
    router.get('/Ride/getRides', getARide);
    router.delete('/Ride/deleteRide/:id', deleteRide);
    router.put('/Ride/updateRide', updateRide);
    router.put('/Ride/cancleride/:id', cancelRide);
};