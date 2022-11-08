import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import Edite from "../edite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import "./Table.css";
import { rowStyle } from "./Row";
const StyledTableRow = styled(TableRow)(() => ({
  [`&.${StyledTableRow.body}`]: {
    padding: "40px 25px",
    textAlign: "center",
    fontFamily: "Open Sans",
    fontSize: "16px",
    color: "#C1C6C2",
  },
}));
const head = {
  color: "white",
};
const baseURL = "http://localhost:8080";
export default function TableGame() {
  const [editestate, setEditestate] = useState(false);
  const [reRender, setRenderstate] = useState(true);
  const [userdetails, setUserdetails] = useState([]);
  const [filterstate, setFilterstate] = useState("");
  const fetch = async () => {
    try {
      const { data } = await axios.get(`${baseURL}/getuser`);
      console.log(data?.data);
      setUserdetails(data?.data);
    } catch (error) {
      console.log("fetch user record", error);
    }
  };

  useEffect(() => {
    fetch();
  }, [reRender]);

  ////////////Remove data according to spicific user id.//////////
  const removeHandle = async (id) => {
    console.log(id, "id");
    try {
      const { data } = await axios.delete(`${baseURL}/remove/${id}`);
      console.log("remove details", data);
      if (data?.success == "ok") {
        alert("delete successully !");
        fetch();
      }
    } catch (error) {
      console.log("remove error", error);
    }
  };

  /////////////Edite handler start here//////////
  const editeHandle = (id) => {
    const result = userdetails?.find((items) => {
      return items?.id === id;
    });
    setFilterstate(result);
    setEditestate(true);
  };

  return (
    <>
      <Edite
        open={editestate}
        setOpen={setEditestate}
        editeValue={filterstate}
        func={setRenderstate}
        renderValue={reRender}
      />
      <TableContainer
        component={Paper}
        sx={{
          position: "relative",
          mt: 3,
          width: { md: "85%", xs: "95%" },
        }}
      >
        <Table
          sx={{ minWidth: 650, color: "red", py: 2 }}
          aria-label="simple table"
        >
          <TableHead style={{ backgroundColor: "#1b8cf7" }}>
            <StyledTableRow sx={rowStyle}>
              <TableCell component="th" style={head}>
                #
              </TableCell>
              <TableCell component="th" style={head}>
                Name
              </TableCell>
              <TableCell component="th" style={head}>
                Email
              </TableCell>
              <TableCell component="th" style={head}>
                Edite
              </TableCell>
              <TableCell component="th" style={head}>
                Remove
              </TableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {React.Children.toArray(
              userdetails?.map(({ id, name, email }, index) => {
                return (
                  <>
                    <StyledTableRow sx={rowStyle}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>{name}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          editeHandle(id);
                        }}
                      >
                        <EditIcon />
                      </TableCell>
                      <TableCell
                        style={{ cursor: "pointer" }}
                        onClick={() => removeHandle(id)}
                      >
                        <DeleteForeverIcon />
                      </TableCell>
                    </StyledTableRow>
                  </>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
    </>
  );
}
