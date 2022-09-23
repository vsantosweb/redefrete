import AddressProps from "./Address"
import Address from "./Address"
import BankProps from "./Bank"
import DriverLicenceProps from "./DriverLicence"
import DriverPasswordProps from "./DriverPassword"
import VehicleProps from "./Vehicle"

interface  DriverProfileProps {
    licence: DriverLicenceProps
    address: AddressProps
    driver_bank: BankProps
    password: DriverPasswordProps
    vehicle: VehicleProps
}

export default DriverProfileProps