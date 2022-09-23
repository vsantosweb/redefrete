
import 'reflect-metadata';
import { Container } from "inversify";
import { DriverAuthApiService } from "./api/Driver/DriverAuthApiService";
import DriverApiService from './api/Driver/DriverApiService';
import { IDriverAuthRepository } from '@redefrete/interfaces';
// import { VehicleInMemoryRepository } from "./inMemory/Vehicle/VehicleInMemoryRepository";



export const SERVICE_KEYS = {
    USER_REPOSITORY: Symbol("VEHICLE_REPOSITORY"),
    DRIVER_AUTH: Symbol("DRIVER_AUTH"),
    DRIVER_REPOSITORY: Symbol('DRIVER_REPOSITORY')

    /* Other services would live here, e.g. ORDER_REPOSITORY */
};

const _container = new Container();

// _container.bind(SERVICE_KEYS.USER_REPOSITORY).to(VehicleInMemoryRepository).inSingletonScope();

_container.bind<IDriverAuthRepository>(SERVICE_KEYS.DRIVER_AUTH).to(DriverAuthApiService).inSingletonScope();
_container.bind(SERVICE_KEYS.DRIVER_REPOSITORY).to(DriverApiService).inSingletonScope();

export const container = _container;