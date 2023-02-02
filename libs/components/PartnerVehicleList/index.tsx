import React from 'react';
import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverPartnerRepository } from '@redefrete/interfaces';
import moment from 'moment';

// import { Container } from './styles';

import * as Styled from './styles';
import { trackPromise } from 'react-promise-tracker';

const driverPartnerService = container.get<IDriverPartnerRepository>(SERVICE_KEYS.DRIVER_PARTNER_REPOSITORY);


const statusList = {
    1: 'Aceito',
    2: 'Pendente',
    3: 'Enviado para análise'
}

export default function PartnerVehicleList() {

    const [vehiclePartners, setVehiclePartners] = React.useState([]);

    React.useEffect(() =>{  getVehicleDrivers() }, [])

    const excludeInvite = (uuid: string) => {
        driverPartnerService.inviteAction('exclude', uuid).then(() => getVehicleDrivers())
    }
    
    const acceptInvite = (uuid: string) => {
        driverPartnerService.inviteAction('accept', uuid).then(() => getVehicleDrivers())
    }

    const getVehicleDrivers = () => trackPromise(
        driverPartnerService.getVehiclePartners().then(response => {
            setVehiclePartners(response.data)
        }), 'show-vehicle')
    
        console.log(vehiclePartners)
    return (
        <div>
            <Styled.TableList>
                {vehiclePartners?.map((partner, index) =>
                    <Styled.TableListWrapper key={index}>
                        <Styled.TableListContainer flex={1}>
                            <Styled.TableLisItem>
                                <p className={'text-sm font-bold text-gray-700'}>VEÍCULO</p>
                                <p style={{ whiteSpace: 'nowrap' }}>{partner.model}</p>
                            </Styled.TableLisItem>
                        </Styled.TableListContainer>

                        <Styled.TableListContainer flex={1}>
                            <Styled.TableLisItem>
                                <p className={'text-sm font-bold'}>RENAVAM</p>
                                <p>{partner.licence_number}</p>
                            </Styled.TableLisItem>
                        </Styled.TableListContainer>

                        <Styled.TableListContainer flex={1}>
                            <Styled.TableLisItem>
                                <p className={'text-sm font-bold'}>PROPRIETÁRIO</p>
                                <p>{partner.name}</p>
                            </Styled.TableLisItem>
                        </Styled.TableListContainer>

                        <Styled.TableListContainer flex={1}>
                            <Styled.TableLisItem>
                                <p className={'text-sm font-bold'}>STATUS</p>
                                <p>{statusList[partner.status]}</p>
                            </Styled.TableLisItem>
                        </Styled.TableListContainer>

                        <Styled.TableListContainer>
                            <Styled.TableLisItem>
                                <p className={'text-sm font-bold'}>CRIADO EM</p>
                                <p>{moment().format('DD/MM/YYYY')}</p>
                            </Styled.TableLisItem>
                        </Styled.TableListContainer>

                        <Styled.TableListContainer>
                            <Styled.TableLisItem>
                                <Menu>
                                    <div> <MenuButton as={IconButton} icon={<i className={'las la-ellipsis-v'}></i>} /></div>
                                    <MenuList>
                                        {partner.status === 2 && <MenuItem onClick={() =>acceptInvite(partner.uuid)}>Aceitar</MenuItem>}
                                        <MenuItem onClick={() => excludeInvite(partner.uuid)}>Excluir</MenuItem>
                                    </MenuList>
                                </Menu>
                            </Styled.TableLisItem>
                        </Styled.TableListContainer>

                    </Styled.TableListWrapper>
                )}
            </Styled.TableList>
        </div>
    )
}