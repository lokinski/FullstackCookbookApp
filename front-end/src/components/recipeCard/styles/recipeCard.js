import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  width: 100%;
  margin: auto;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 992px) {
    flex-direction: column;
  }
`;