import Link from 'next/link';
import React from 'react'
import * as Styled from './styles';

export type ListViewProps = {
    path?: string,
    name: string
    icon?: JSX.Element
    label?: string
}
const ListView = ({ list }): JSX.Element => {

    return (
        <Styled.ListContainer>
            <Styled.List>
                {list.map((item, index) =>
                    <Link key={index} href={item.path}>
                        <a>

                            <Styled.ListListItem>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <i style={{fontSize: '1.6em'}} className={'las la-car'}></i>
                                    <Styled.ListItemContent>
                                        <Styled.ListTitle>{item.name}</Styled.ListTitle>
                                    </Styled.ListItemContent>
                                </div>
                                <span style={{ flex: 1, textAlign: 'right', color: '#4d4d4d' }}>{item.label}</span>
                                <i className={'las la-angle-right'}></i>
                            </Styled.ListListItem>
                        </a>
                    </Link>
                )}
            </Styled.List>
        </Styled.ListContainer>
    )
}

export default ListView;