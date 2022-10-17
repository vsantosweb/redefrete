import { Document } from "./Document"

export type DriverDocument = {
    id: string
    driver_id: string
    document_id: string
    is_main: string
    status: string
    file_sent: string
    file_path: string
    file_format: string
    metadata: string
    document: Document
}

