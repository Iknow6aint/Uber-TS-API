import { deleteUser, getAllUsers, getUser, getUserCompletedRides, updateUser } from './../controller/users';

import express from 'express';


export default (router: express.Router) => {
    router.get('/user/getallUser', getAllUsers);
    router.put('/user/getUsers/:id', getUser);
    router.delete('/user/deleteUser/:id', deleteUser);
    router.put('/user/updateUser/:id', updateUser);
    router.patch('/user/completedrides/:id', getUserCompletedRides);
};
