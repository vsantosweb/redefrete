import { BankProps } from "./Bank"

export type Driver = {
    id?: number,
    uuid?: string,
    phone?: string,
    name?: string,
    email?: string,
    document_1?: string,
    password?: string,
    gender?: string,
    status?: string,
    notify?: string,
    newsletter?: string,
    email_verified_at?: string,
    last_activity?: string,
    home_dir?: string,
    first_time?: string,
    driver_status_id?: number,
    accepted_terms?: boolean,
    user_agent?: string,
    banks?: Array<BankProps>,
    ip?: string,
}

