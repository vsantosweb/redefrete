
export interface IDriverAuthRepository  {
    
    login(credentials: any): Promise<any>;
    logout(): Promise<any>;
    session(): any;
    redirect(): any;
    completeRegister(driver: any):Promise<any>;
    sampleRegister(driver: any):Promise<any>;    
}
