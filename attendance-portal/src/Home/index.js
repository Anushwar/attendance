/** @jsxImportSource @emotion/core */
import { Button } from "@chakra-ui/core";
import styled from "@emotion/styled";
import { Link  } from "react-router-dom";

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  margin: 30,
});

const HomeButton = styled(Button)({
  marginTop:30,
  width:'100%',
});

const Admin = () => {
  return (
    <Container>
      <Link to="/admin">
        <HomeButton>Admin Dashboard</HomeButton>
      </Link>
      <Link to="/student">
        <HomeButton>Student Dashboard</HomeButton>
      </Link>
      <Link to="/teacher">
        <HomeButton>Teacher Dashboard</HomeButton>
      </Link>
    </Container>
  );
};

export default Admin;
