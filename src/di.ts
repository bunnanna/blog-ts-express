import { PrismaClient } from "@prisma/client";
import { configUserDI } from "./app/user/di/userDIRegister";
import prisma, { dbIdentifier } from "./core/dbConnection/prisma";
import container from "./core/di/container";

container.bind<PrismaClient>(dbIdentifier.PrismaClient).toConstantValue(prisma);
configUserDI(container);

export default container;
