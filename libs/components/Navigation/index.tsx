import Link from 'next/link';
import React from 'react';

import * as Styled from './styles';

export default function Navigation({ list }) {
    return (
        <Styled.NavigationContainer>
            <Styled.NavigationList>
                {list.map(item =>
                    item.visible && <Link href={item.path}>
                        <a>
                            <Styled.NavigationListItem>
                                <Styled.NavigationItemContent>
                                    <Styled.NavigationTitle>{item.name}</Styled.NavigationTitle>
                                    <p>{item.description}</p>
                                </Styled.NavigationItemContent>
                                <i className={'las la-angle-right'}></i>
                            </Styled.NavigationListItem>
                        </a>
                    </Link>
                )}
            </Styled.NavigationList>
        </Styled.NavigationContainer>
    )
}