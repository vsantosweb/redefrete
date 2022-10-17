
import 'reflect-metadata';
import { Container } from "inversify";
import { DriverAuthApiService } from "./api/Driver/DriverAuthApiService";
import DriverApiService from './api/Driver/DriverApiService';
import {
    ICaptureLead,
    IDriverAuthRepository,
    IDriverLicenceRepository,
    IDriverRepository,
    IVehicleTypeRepository,
    IDriverVehicleRepository
} from '@redefrete/interfaces';
import VehicleTypeApiService from './api/Vehicle/VehicleTypeApiService';
import CaptureLeadApiService from './api/CaptureLeadApiService';
import { DriverLicenceApiService } from './api/Driver/DriverLicenceApiService';
import { DriverVehicleApiService } from './api/Driver/DriverVehicleApiService';
import { IVehicleRepository } from '../Interfaces/Vehicle/IVehicleRepository';
import VehicleApiService from './api/Vehicle/VehicleApiService';
// import { VehicleInMemoryRepository } from "./inMemory/Vehicle/VehicleInMemoryRepository";



export const SERVICE_KEYS = {
    USER_REPOSITORY: Symbol("VEHICLE_REPOSITORY"),
    DRIVER_AUTH: Symbol("DRIVER_AUTH"),
    DRIVER_REPOSITORY: Symbol('DRIVER_REPOSITORY'),
    DRIVER_LICENCE_REPOSITORY: Symbol('DRIVER_REPOSITORY'),
    DRIVER_VEHICLE_REPOSITORY: Symbol('DRIVER_VEHICLE_REPOSITORY'),

    VEHICLE_TYPE_REPOSITORY: Symbol('VEHICLE_TYPE_REPOSITORY'),
    VEHICLE_REPOSITORY: Symbol('VEHICLE_REPOSITORY'),
    CAPTURE_LEAD_REPOSITORY: Symbol('CAPTURE_LEAD_REPOSITORY')
    /* Other services would live here, e.g. ORDER_REPOSITORY */
};

const _container = new Container();

// _container.bind(SERVICE_KEYS.USER_REPOSITORY).to(VehicleInMemoryRepository).inSingletonScope();

_container.bind<IDriverAuthRepository>(SERVICE_KEYS.DRIVER_AUTH).to(DriverAuthApiService).inSingletonScope();
_container.bind<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY).to(DriverApiService).inSingletonScope();
_container.bind<IDriverLicenceRepository>(SERVICE_KEYS.DRIVER_LICENCE_REPOSITORY).to(DriverLicenceApiService).inSingletonScope();
_container.bind<DriverVehicleApiService>(SERVICE_KEYS.DRIVER_VEHICLE_REPOSITORY).to(DriverVehicleApiService).inSingletonScope();


_container.bind<IVehicleTypeRepository>(SERVICE_KEYS.VEHICLE_TYPE_REPOSITORY).to(VehicleTypeApiService).inSingletonScope();
_container.bind<IVehicleRepository>(SERVICE_KEYS.VEHICLE_REPOSITORY).to(VehicleApiService).inSingletonScope();
_container.bind<ICaptureLead>(SERVICE_KEYS.CAPTURE_LEAD_REPOSITORY).to(CaptureLeadApiService).inSingletonScope();

export const container = _container;