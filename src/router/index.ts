import express from 'express';

import authentication from './authentication';
import ride from './ride';
import user from './user';
//import users from './users';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    user(router);
    ride(router)

    return router;
};