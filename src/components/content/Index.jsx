import React from 'react';
import * as S from "./styles";
import LabelBottomNavigation from '../navbar';

export const Content = ({ children }) => {
    return (
    <S.Container>
        {children}
        <LabelBottomNavigation />
    </S.Container>);
}