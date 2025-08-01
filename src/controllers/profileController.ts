
import { Request, Response } from "express";
import * as ProfileService from "../services/profileService";

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const newProfile = await ProfileService.createProfile(req.body);
    res.status(201).json(newProfile);
  } catch (err) {
    res.status(500).json({ message: "Failed to create profile", error: err });
  }
};

export const getAllProfiles = async (_req: Request, res: Response): Promise<void> => {
  try {
    const profiles = await ProfileService.getAllProfiles();
    res.status(200).json(profiles);
  } catch (err) {
    res.status(500).json({ message: "Failed to get profiles", error: err });
  }
};



