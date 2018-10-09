import React from 'react'
import styled from 'styled-components'
import colors from '../assets/styles/colors'

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  text-align: center;
  margin-bottom: -1rem;
`

const Line = styled.div`
  position: relative;
  bottom: 1rem;
  width: 120px;
  height:  1px;
  margin: 0 auto;
  background-color: ${colors.$teal};
  opacity: 0.5;
`;

const Triangle = styled.div`
  & {
    position: relative;
    margin: 0 auto;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 26.0px 15px 0 15px;
    border-color: ${colors.$teal} transparent transparent transparent;
  }
  &:after {
    content: '';
    position: absolute;
    left: -0.8rem;
    top: -1.55rem;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 24px 13px 0 13px;
    border-color: ${colors.$dark} transparent transparent transparent;
  }
`;

const TriangleSeparator = (props) => (
  <Wrapper>
    <Triangle />
    <Line />
  </Wrapper>
)

export default TriangleSeparator