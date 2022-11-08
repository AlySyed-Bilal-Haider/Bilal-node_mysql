import React from "react";
import TableGame from "./Table/Table";
import { Box } from "@mui/material";
function Read() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <TableGame />
    </Box>
  );
}

export default Read;
