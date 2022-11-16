import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
} from "@chakra-ui/react";


export const Header = () => {
  return (
        <div data-testid="head">
    <Heading size="lg" p='2' fontStyle='italic' fontSize="50px" bg='blackAlpha.400'>
        Follow up and Update your organization tasks here :)
      </Heading>
      <Breadcrumb spacing="8px" p='5' bg= '#E2E8F0' mt='0'>
        <BreadcrumbItem>
          <BreadcrumbLink fontWeight='fha.1'  p='5px 5px'  href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem>
          <BreadcrumbLink fontWeight='fha.1' p='5px 5px'  href="/tasks">Tasks</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem >
          <BreadcrumbLink fontWeight='fha.1'  display='block' p='5px 5px' href="/signup">Registration</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

{/* 
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Tasks Management </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/tasks">Tasks</Nav.Link>
              <Nav.Link href="/signup">Registration</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </div>
  );
};
