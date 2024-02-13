import styled from 'styled-components';

const style = styled.ul`
  list-style: none;
  
  & > li a img {
    display: block;
  }

  @media (min-width: 900px) {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 500px;
    padding-top: 0;
    padding-bottom: 0;
  }
`;

export default style;
