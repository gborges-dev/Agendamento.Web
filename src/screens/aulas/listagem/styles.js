import styled, { css } from 'styled-components';

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

export const Card = styled.div`
  width: 320px;
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
  justify-content: space-between;
  align-items: center;
`;

export const Label = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

export const Horario = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: #111827;
`;

export const Descricao = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
`;

export const Text = styled.span`
  font-size: 15px;
  color: #374151;
`;

export const Status = styled.span`
  display: inline-block;
  margin-top: 4px;
  padding: 4px 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;

  ${({ status }) =>
    status === "Agendada" &&
    css`
      background-color: #d1fae5;
      color: #065f46;
    `}

  ${({ status }) =>
    status === "Concluída" &&
    css`
      background-color: #dbeafe;
      color: #1e40af;
    `}

  ${({ status }) =>
    status === "Cancelada" &&
    css`
      background-color: #fee2e2;
      color: #991b1b;
    `}
`;