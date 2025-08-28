import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: auto; 
  max-width: 90%;
`;

export const Fbar = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin-top: 15px;
    gap: 10px;
    width: 100%;
    height: 35px;
`