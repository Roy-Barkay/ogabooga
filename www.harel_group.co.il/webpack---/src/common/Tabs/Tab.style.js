import styled from 'styled-components';
// padding: 12px 16px 8px 16px;
const Tab = styled.li`
  
  padding: 4px 2px 0px 2px;
  padding-left: 6px;
  padding-right: 6px;
  padding-top: 0px;
  padding-bottom: 0px;
  border: 2px solid transparent;
  background-color: #fff;
  box-shadow: ${props => props.active ? 'none' : '0 0 10px 0 rgba(0, 0, 0, 0.1)'};
  cursor: pointer;
  border-color: ${props => props.active ? '#2d76cb' : 'transparent'};
  font-weight: ${props => props.active ? 'bold' : '300'};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;

  border-bottom-color:  ${props => props.active ? '#fff' : '#2d76cb'};
  position: relative;
  top: 2px;
`;

const TabAvatar = styled.div`
  margin-bottom: 6px;
  height: 36px;
  
  width: 40px;
  margin: 0 auto;
  
  & > svg {
    width: 100%;
    height: auto;
  }
  
  & + div {
    margin-top: 6px;
  }
`;

const TabLabel = styled.div`
  font-size: 0.9rem;
  font-weight: inherit;
  text-align: center;
  line-height: 1;
  color: #003c7f;
`;

export default {
  Tab,
  TabAvatar,
  TabLabel
}