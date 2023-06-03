import { deleteUser, getAllUsers, getUser, updateUser } from './../controller/users';

import express from 'express';


export default (router: express.Router) => {
    router.get('/user/getallUser', getAllUsers);
    router.put('/user/getUsers', getUser);
    router.put('/user/deleteUser', deleteUser);
    router.put('/user/updateUser', updateUser);
};
