
import User from '../../db/models/userModel';
import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.isAuthenticated()) {
            const image = req.body.image
            if (!image) {
                res.status(400).send('No file uploaded, try again.');
                return
            }
            await User.findByIdAndUpdate(req.params.userId, { profilePicture: image });
            res.status(201).send("Profile pic updated");
        }
        else {
            res.status(401).send("User not Authorized")
        }
    }
    catch (error: any) {
        res.status(500).send("Error uploading file\n Error: " + error)
    }
};


export const getFile = async (req: Request, res: Response): Promise<void> => {
    try {
        if (req.isAuthenticated()) {
            const user = await User.findById(req.params.userId);
            if (user && user.profilePicture) {
                // Assuming the profilePicture is a base64 encoded string
                res.send(user.profilePicture);
            } else {
                res.status(404).send('Image not found');
            }
        }
    }
    catch (error: any) {
        res.status(500).send('Server error');
    }
};

