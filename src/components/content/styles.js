import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f1f1f1ff;
  border-radius: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25); /* Box shadow suave */
  padding: 20px;
  height: calc(100vh - 130px); /* Considera a altura do header */
  overflow: hidden; /* Esconde o conteúdo horizontal */
  overflow-y: auto; /* Adiciona rolagem vertical */
`;
