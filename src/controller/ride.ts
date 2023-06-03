import { deleteRideById, getRide, getRideById, updateRideById, createRide } from './../db/ride';
import express from 'express'


//get All rides
export const getAllRide = async (req: express.Request, res: express.Response) => {
    try {
        const ride = await getRide()
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