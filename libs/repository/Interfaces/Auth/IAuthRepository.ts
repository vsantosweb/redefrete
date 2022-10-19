export interface IAuthRepository  {
    login(credentials: any): Promise<any>;
    logout(): Promise<any>;
    session(): any;
    redirect(to: string): any;
    redirectToLogin(): void;
}
