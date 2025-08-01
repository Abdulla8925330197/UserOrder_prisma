import {PrismaClient} from "@prisma/client";
import {Profile} from "../dto/profileDto";

const prisma = new PrismaClient()

export  const createProfile = async(data:Profile)=>{
    return prisma.profiles.create({data})
}

export const getAllProfiles = async ()=> {
  return prisma.profiles.findMany();
};






