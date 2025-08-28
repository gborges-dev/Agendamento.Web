import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const ContainerButton = styled.div`
    height: 35px;
    margin-left: 30px;
`;

export const GridCard = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;

export const ContainerButtonEditar = styled.div`
    display: flex;
    justify-content: end;
    height: 35px;
    margin-top: 10px;
`;


export const Form = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 350px;
    gap: 15px;
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;