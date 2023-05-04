import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Stack from 'react-bootstrap/Stack';

export default function Footer() {

  return (
    <Navbar fixed="bottom" bg="none" expand="lg" >
      <Container fluid >
        
          <Stack direction="horizontal" gap={3}>
            
            <i class="fa-brands fa-github" style={{fontSize: 25}}></i>
            <i class="fa-brands fa-linkedin" style={{fontSize: 25}}></i>
            
        </Stack>

      </Container>
    </Navbar>
  );
}
