import { Request, Response } from "express";
import * as ProfileService from "../services/profileService";
import { ProfileCreateDto } from "../dto/profileDto";

export const createProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const {id, name, email, password } = req.body;

    if (!id||  !name || !email || !password) {
      res.status(400).json({ message: "Name, email, and password are required." });
      return;
    }

    const input: ProfileCreateDto = {id, name, email, password };

    const newProfile = await ProfileService.createProfile(input);

    
    const { passwordHash, ...safeProfile } = newProfile as any;
    res.status(201).json({ message: "Profile created successfully", profile: safeProfile });
  } catch (error) {
    console.error("Error creating profile:", error);
    res.status(500).json({ message: "Failed to create profile", error });
  }
};

export const getAllProfiles = async (req: Request, res: Response): Promise<void> => {
  try {
    const profiles = await ProfileService.getAllProfiles();

    
    const safeProfiles = profiles.map(({ passwordHash, ...rest }) => rest);

    res.status(200).json(safeProfiles);
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).json({ message: "Failed to fetch profiles", error });
  }
};
