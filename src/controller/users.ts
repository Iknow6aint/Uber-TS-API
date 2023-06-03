import { deleteUserById, getUserById, getUsers, updateUserById } from './../db/users';
import express from 'express'


//get All users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await getUsers()
        return res.status(200).json(users).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await getUserById(id)
        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await deleteUserById(id)
        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}
export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await updateUserById(id, req.body)
        return res.status(200).json(user).end()
    } catch (error) {
        console.log(error);
        return res.sendStatus(400)
    }
}