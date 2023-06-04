import { deleteRideById, getRide, getRideById, updateRideById, createRide } from './../db/ride';
import express from 'express'


//get All rides
export const getAllRide = async (req: express.Request, res: express.Response) => {
    try {
        const ride = await getRide()
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }
        return res.status(200).json(ride).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
export const getARide = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const ride = await getRideById(id)
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }
        return res.status(200).json(ride).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const deleteRide = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const ride = await deleteRideById(id)
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }
        return res.status(200).json(ride).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
export const updateRide = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const ride = await updateRideById(id, req.body)
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }
        return res.status(200).json(ride).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
export const createNewRide = async (req: express.Request, res: express.Response) => {
    try {
        const ride = await createRide(req.body)
        return res.status(200).json(ride).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const cancelRide = async (req: express.Request, res: express.Response): Promise<void> => {
    try {
        const { id } = req.params;
        const ride = await getRideById(id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        if (ride.status !== 'Requested') {
            res.status(400).json({ message: 'Cannot cancel ride that is not requested' });
            return;
        }

        await ride.remove();
        res.json({ message: 'Ride cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};