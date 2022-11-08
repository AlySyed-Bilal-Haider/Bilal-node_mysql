import React from "react";
import StyledButtton from "./Component/StyledButton";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
function Header() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        background: "black",
        p: 1,
      }}
    >
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <StyledButtton style={{ marginRight: "10px" }}> Add </StyledButtton>
      </Link>

      <Link to="/read" style={{ color: "white", textDecoration: "none" }}>
        <StyledButtton> Read </StyledButtton>
      </Link>
    </Box>
  );
}

export default Header;
