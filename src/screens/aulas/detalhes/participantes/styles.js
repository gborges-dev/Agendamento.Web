import styled, { css } from 'styled-components';

export const ContainerPai = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 350px;
    height: 350px;
    overflow: hidden;
    overflow-y: auto;
    overflow-x  : auto;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const GridCard = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
`;

export const Card = styled.div`
  width: 100%;
  border-radius: 16px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
  padding: 16px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
`;


export const Text = styled.span`
  font-size: 15px;
  color: #374151;
`;