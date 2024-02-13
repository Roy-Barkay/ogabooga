import styled from 'styled-components';

const Tabs = styled.div`

`;

const TabsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  padding-right: 10px;
  padding-left: 10px;
`;

const TabsContent = styled.div`
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 17px;
   border: 2px solid #2d76cb;
  border-radius: 12px;
  
  .hide {
    display: none;
  }
`;



export default {
  Tabs,
  TabsList,
  TabsContent,
}