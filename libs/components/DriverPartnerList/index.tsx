import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { container, SERVICE_KEYS } from '@redefrete/container';
import { IDriverPartnerRepository } from '@redefrete/interfaces';
import moment from 'moment';
import React from 'react';

// import { Container } from './styles';

import * as Styled from './styles';

const driverPartnerService = container.get<IDriverPartnerRepository>(SERVICE_KEYS.DRIVER_PARTNER_REPOSITORY);


const statusList = {
    1: 'Aceito',
    2: 'Pendente'
}

export default function DriverPartnerList({ partners, showVehicle }) {

    const excludeInvite = (uuid: string) => {
        driverPartnerService.inviteAction('exclude', uuid).then(() => showVehicle())
    }
    
    return (
        <div>
            <Styled.TableList>
                {partners?.map((partner, index) =>
                    <Styled.TableListWrapper key={index}>
                        <Styled.TableListContainer flex={1}>
                            <Styled.TableLisItem>
                                <p className={'text-sm font-bold text-gray-700'}>MOTORISTA</p>
                                <p style={{ whiteSpace: 'nowrap' }}>{partner.name}</p>
                            </Styled.TableLisItem>
                        </Styled.TableListContainer>

                        <Styled.TableListContainer flex={1}>
                            <Styled.TableLisItem>
                                <p className={'text-sm font-bold'}>EMAIL</p>
                                <p>{partner.email}</p>
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
                                <p>{moment(partner.created_at).format('LL')}</p>
                            </Styled.TableLisItem>
                        </Styled.TableListContainer>

                        <Styled.TableListContainer>
                            <Styled.TableLisItem>
                                <Menu>
                                    <div> <MenuButton as={IconButton} icon={<i className={'las la-ellipsis-v'}></i>} /></div>
                                    <MenuList>
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