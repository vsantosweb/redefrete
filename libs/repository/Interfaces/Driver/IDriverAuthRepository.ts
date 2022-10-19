import { IAuthRepository } from "../Auth/IAuthRepository";

export interface IDriverAuthRepository extends IAuthRepository {
    completeRegister(driver: any): Promise<any>;
    sampleRegister(driver: any): Promise<any>;
    verifyAccountRegister(driver: any): Promise<any>;
}
