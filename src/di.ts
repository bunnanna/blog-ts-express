import { PrismaClient } from '@prisma/client';
import { configUserDI } from './app/user/di/userDIRegister';
import JWTAccessService from './core/class/JWTService/JWTAccessService';
import JWTRefreshService from './core/class/JWTService/JWTRefreshService';
import prisma from './core/dbConnection/prisma';
import container from './core/di/container';
import { coreIdentifier } from './core/di/coreIdentifier';

container.bind<PrismaClient>(coreIdentifier.PrismaClient).toConstantValue(prisma);
container
	.bind<JWTRefreshService>(coreIdentifier.JWTRefreshService)
	.toConstantValue(new JWTRefreshService(process.env.JWT_SECRET_REFRESH!));
container
	.bind<JWTAccessService>(coreIdentifier.JWTAccessService)
	.toConstantValue(new JWTAccessService(process.env.JWT_SECRET_REFRESH!));

configUserDI(container);

export default container;
