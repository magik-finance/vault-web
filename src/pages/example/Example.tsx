import React, { FC }  from 'react';
import { Container } from './Example.styles';

interface ExampleT {}

const Example:FC<ExampleT> = () => {
 return (
   <Container>
     <h1>Hello Motto</h1>
   </Container>
 )
}

export default Example;
