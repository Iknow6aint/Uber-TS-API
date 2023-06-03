import { createDriver } from './../db/driver';
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
export const createNewDriver = async (req: express.Request, res: express.Response) => {
    try {
        const driver = await createDriver(req.body)
        return res.status(200).json(driver).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}