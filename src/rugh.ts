import { Request, Response } from 'express';
import Ride from '../models/Ride';

// Ride Request Controller
export const createRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const { pickupLocation, destination } = req.body;

        const ride = new Ride({
            pickupLocation,
            destination,
            status: 'requested',
        });

        const newRide = await ride.save();
        res.status(201).json(newRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }
        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        ride.pickupLocation = req.body.pickupLocation;
        ride.destination = req.body.destination;

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        if (ride.status !== 'requested') {
            res.status(400).json({ message: 'Cannot cancel ride that is not requested' });
            return;
        }

        await ride.remove();
        res.json({ message: 'Ride cancelled successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Driver Controller
export const getAvailableDrivers = async (req: Request, res: Response): Promise<void> => {
    try {
        // Logic to retrieve available drivers
        const availableDrivers = await Driver.find({ isAvailable: true });
        res.json(availableDrivers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignDriver = async (req: Request, res: Response): Promise<void> => {
    try {
        const { rideId, driverId } = req.body;

        const ride = await Ride.findById(rideId);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        const driver = await Driver.findById(driverId);
        if (!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }

        ride.driver = driver;
        ride.status = 'accepted';

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const acceptRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        const driver = await Driver.findById(req.body.driverId);
        if (!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }

        ride.driver = driver;
        ride.status = 'accepted';

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const rejectRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        ride.driver = null;
        ride.status = 'requested';

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const startRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        ride.status = 'ongoing';

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const completeRide = async (req: Request, res: Response): Promise<void> => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        ride.status = 'completed';

        const updatedRide = await ride.save();
        res.json(updatedRide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// User Controller
export const getUserRides = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;

        const rides = await Ride.find({ user: userId });
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserCompletedRides = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;

        const completedRides = await Ride.find({ user: userId, status: 'completed' });
        res.json(completedRides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserOngoingRides = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;

        const ongoingRides = await Ride.find({ user: userId, status: 'ongoing' });
        res.json(ongoingRides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Admin Controller
export const getAllRides = async (req: Request, res: Response): Promise<void> => {
    try {
        const rides = await Ride.find();
        res.json(rides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCompletedRides = async (req: Request, res: Response): Promise<void> => {
    try {
        const completedRides = await Ride.find({ status: 'completed' });
        res.json(completedRides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOngoingRides = async (req: Request, res: Response): Promise<void> => {
    try {
        const ongoingRides = await Ride.find({ status: 'ongoing' });
        res.json(ongoingRides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getRideDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const ride = await Ride.findById(req.params.id).populate('user').populate('driver');
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }
        res.json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const cancelRideByAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const ride = await Ride.findById(req.params.id);
        if (!ride) {
            res.status(404).json({ message: 'Ride not found' });
            return;
        }

        await ride.remove();
        res.json({ message: 'Ride cancelled by admin' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
