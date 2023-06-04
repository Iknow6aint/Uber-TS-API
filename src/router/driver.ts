import { getAllDriver, getADriver, deleteDriver, updateDriver, acceptRide, startRide, completeRide } from './../controller/driver';


import express from 'express';


export default (router: express.Router) => {
    router.get('/driver/getalldrivers', getAllDriver);
    router.get('/driver/getadiver/:id', getADriver);
    router.delete('/driver/deletedriver/:id', deleteDriver);
    router.put('/driver/updatedriver/:id', updateDriver);
    router.patch('/driver/acceptride/:id', acceptRide);
    router.patch('/driver/startride/:id', startRide);
    router.patch('/driver/startride/:id', completeRide);
};