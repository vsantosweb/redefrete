import AddressProps from "./Address"
import Address from "./Address"
import BankProps from "./Bank"
import { DriverProps } from "./Driver"
import { DriverDocument } from "./DriverDocument"
import DriverLicenceProps from "./DriverLicence"
import DriverPasswordProps from "./DriverPassword"
import VehicleProps from "./Vehicle"

export interface DriverProfile extends DriverProps {
    licence?: DriverLicenceProps
    address?: AddressProps
    banks?: Array<BankProps>
    documents?: DriverDocument
    password?: DriverPasswordProps
    vehicles?: Array<VehicleProps>
}