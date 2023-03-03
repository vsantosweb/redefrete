
import 'reflect-metadata';
import { Container } from "inversify";
import { DriverAuthApiService } from "./api/Driver/DriverAuthApiService";
import DriverApiService from './api/Driver/DriverApiService';
import {
    ICaptureLead,
    IDriverAuthRepository,
    IDriverBankRepository,
    IDriverContractRepository,
    IDriverLicenceRepository,
    IDriverPartnerRepository,
    IDriverRepository,
    IDriverVehicleRepository,
    IVehicleTypeRepository,
} from '@redefrete/interfaces';
import VehicleTypeApiService from './api/Vehicle/VehicleTypeApiService';
import CaptureLeadApiService from './api/CaptureLeadApiService';
import { DriverLicenceApiService } from './api/Driver/DriverLicenceApiService';
import { DriverVehicleApiService } from './api/Driver/DriverVehicleApiService';
import { IVehicleRepository } from '../Interfaces/Vehicle/IVehicleRepository';
import VehicleApiService from './api/Vehicle/VehicleApiService';
import { DriverPartnerApiService } from './api/Driver/DriverPartnerApiService';
import { DriverContractApiService } from './api/Driver/DriverContractApiService';
import { DriverBankApiService } from './api/Driver/DriverBankApiService';


''
export const SERVICE_KEYS = {
    USER_REPOSITORY: Symbol("VEHICLE_REPOSITORY"),
    DRIVER_AUTH: Symbol("DRIVER_AUTH"),
    DRIVER_REPOSITORY: Symbol('DRIVER_REPOSITORY'),
    DRIVER_LICENCE_REPOSITORY: Symbol('DRIVER_REPOSITORY'),
    DRIVER_VEHICLE_REPOSITORY: Symbol('DRIVER_VEHICLE_REPOSITORY'),
    DRIVER_PARTNER_REPOSITORY: Symbol('DRIVER_PARTNER_REPOSITORY'),
    DRIVER_CONTRACT: Symbol('DRIVER_CONTRACT'),
    DRIVER_BANK_REPOSITORY: Symbol('DRIVER_BANK_REPOSITORY'),
    VEHICLE_TYPE_REPOSITORY: Symbol('VEHICLE_TYPE_REPOSITORY'),
    VEHICLE_REPOSITORY: Symbol('VEHICLE_REPOSITORY'),
    CAPTURE_LEAD_REPOSITORY: Symbol('CAPTURE_LEAD_REPOSITORY')
};

const _container = new Container();

_container.bind<IDriverAuthRepository>(SERVICE_KEYS.DRIVER_AUTH).to(DriverAuthApiService).inSingletonScope();
_container.bind<IDriverBankRepository>(SERVICE_KEYS.DRIVER_BANK_REPOSITORY).to(DriverBankApiService).inSingletonScope();
_container.bind<IDriverRepository>(SERVICE_KEYS.DRIVER_REPOSITORY).to(DriverApiService).inSingletonScope();
_container.bind<IDriverLicenceRepository>(SERVICE_KEYS.DRIVER_LICENCE_REPOSITORY).to(DriverLicenceApiService).inSingletonScope();
_container.bind<IDriverVehicleRepository>(SERVICE_KEYS.DRIVER_VEHICLE_REPOSITORY).to(DriverVehicleApiService).inSingletonScope();
_container.bind<IDriverPartnerRepository>(SERVICE_KEYS.DRIVER_PARTNER_REPOSITORY).to(DriverPartnerApiService).inSingletonScope();
_container.bind<IDriverContractRepository>(SERVICE_KEYS.DRIVER_CONTRACT).to(DriverContractApiService).inSingletonScope();
_container.bind<IVehicleTypeRepository>(SERVICE_KEYS.VEHICLE_TYPE_REPOSITORY).to(VehicleTypeApiService).inSingletonScope();
_container.bind<IVehicleRepository>(SERVICE_KEYS.VEHICLE_REPOSITORY).to(VehicleApiService).inSingletonScope();
_container.bind<ICaptureLead>(SERVICE_KEYS.CAPTURE_LEAD_REPOSITORY).to(CaptureLeadApiService).inSingletonScope();

export const container = _container;