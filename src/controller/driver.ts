import { getRideById } from './../db/ride';
import { createDriver, DriverModel } from './../db/driver';
import { deleteDriverById, getDriver, getDriverById, updateDriverById } from './../db/Driver';
import express from 'express'


//get All Drivers
export const getAllDriver = async (req: express.Request, res: express.Response) => {
    try {
        const driver = await getDriver()
        return res.status(200).json(driver).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
//get A driver
export const getADriver = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const driver = await getDriverById(id)
        return res.status(200).json(driver).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
//delete driver

export const deleteDriver = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const driver = await deleteDriverById(id)
        return res.status(200).json(driver).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
// update driver
export const updateDriver = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const driver = await updateDriverById(id, req.body)
        return res.status(200).json(driver).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

//createDriver
export const createNewDriver = async (req: express.Request, res: express.Response) => {
    try {
        const driver = await createDriver(req.body)
        return res.status(200).json(driver).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

// get available Drivers
export const getAvailableDrivers = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        // Logic to retrieve available drivers
        const availableDrivers = await DriverModel.find({ isAvailable: true })
        res.json(availableDrivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const assignDriver = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        // ride was passed as body
        const { id } = req.params;
        const { driverId } = req.body;

        const ride = await getRideById(id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        const driver = await getDriverById(driverId);
        if (!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }

        ride.driver = driver.id;
        ride.status = 'Accepted';

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const acceptRide = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        //ride was passed as params
        const { driverId } = req.body;
        const { id } = req.params;
        const ride = await getRideById(id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        const driver = await getDriverById(driverId)
        if (!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }

        ride.driver = driver.id;
        ride.status = 'Accepted';

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const startRide = async (req: express.Request, res: express.Response): Promise<void> => {
    try {

        const ride = await getRideById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        ride.status = 'Ongoing';

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const completeRide = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const ride = await getRideById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        ride.status = 'Arrived';

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};