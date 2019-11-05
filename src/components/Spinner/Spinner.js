import styled from 'styled-components';

const spinner = styled.div `
  display: flex;
  position: absolute;
  top: 205px;
  bottom: 0;
  left: 0;
  right: 0;
  margin: 0 auto;
  align-self: center;
  border: 5px solid #f3f3f3; /* Light grey */
  border-top: 5px solid #5185ba;; /* Blue */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-bottom: 100px;
  animation: spin 2s linear infinite;
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

export default spinner;