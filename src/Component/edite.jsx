import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  Dialog,
  DialogContent,
  Slide,
  Box,
  InputBase,
  Button,
} from "@mui/material";
import { styled } from "@mui/styles";
import { withStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect } from "react";
const baseURL = "http://localhost:8080";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const StyledModal = withStyles(() => ({
  root: {
    "& .MuiDialog-paper": {
      maxWidth: "400px !important",
    },
    "& .MuiDialog-root": {
      zIndex: "1301 !important",
      height: "100% !important",
    },
    "&.MuiDialog-container": {
      overflowX: "hidden !important",
    },

    "& .MuiDialog-paperScrollPaper": {
      backgroundColor: "skyblue !important",
      boxShadow: "black 0px 0px 8px 1px",
      borderRadius: "5px",
    },
    "& .dialoge__content__section": {
      background: "formscheme.main",
    },
  },
}))(Dialog);

const TextInput = styled(InputBase)({
  "& .MuiInputBase-input": {
    width: "90%",
    border: "1px solid black",
    position: "relative",
    borderRadius: "5px",
    color: "#000",
    backgroundColor: "#D9D9D9",
    fontSize: "18px",
    padding: "12px 20px",
    marginTop: "10px",
    textAlign: "center",
    "&::-webkit-outer-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
    "&::-webkit-inner-spin-button": {
      WebkitAppearance: "none",
      margin: 0,
    },
  },
});
/////////////Edite function start here////////////////
function Edite({ open, setOpen, editeValue, func, renderValue }) {
  const [userstate, setUserstate] = React.useState({
    email: "",
    name: "",
    id: "",
  });

  useEffect(() => {
    setUserstate({
      ...userstate,
      email: editeValue.email,
      name: editeValue.name,
      id: editeValue.id,
    });
  }, [editeValue]);
  //input filed change handler;
  const changeHandler = (e) => {
    setUserstate({ ...userstate, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setUserstate({
      name: "",
      email: "",
    });
    setOpen(false);
    func(!renderValue);
  };

  //Submit form, after filling the user form;
  const editeHandler = async () => {
    try {
      const { data } = await axios.post(`${baseURL}/update`, userstate);
      handleClose();
    } catch (error) {
      console.log("error edite:", error);
    }
  };

  return (
    <>
      <StyledModal
        open={open}
        keepMounted
        TransitionComponent={Transition}
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent className="dialoge__content__section">
          <Box sx={{ float: "right", p: 1, cursor: "pointer" }}>
            <CloseIcon sx={{ color: "black" }} onClick={handleClose} />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              align: "center",
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "20px",
                  paddingBottom: "20px",
                  color: "text.main",
                  fontWeight: 700,
                }}
              >
                Profile Edite
              </Typography>
              <Box
                sx={{
                  width: "90%",
                  padding: "30px 25px",
                  backgroundColor: "black",
                }}
              >
                <TextInput
                  fullWidth
                  type="email"
                  value={userstate.email || ""}
                  onChange={changeHandler}
                  placeholder="Email"
                  name="email"
                  autoComplete="off"
                />

                <TextInput
                  fullWidth
                  type="text"
                  value={userstate.name || ""}
                  onChange={changeHandler}
                  placeholder="name"
                  name="name"
                  autoComplete="off"
                />

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    editeHandler();
                  }}
                  type="submit"
                  sx={{
                    width: "100%",
                    my: 1,
                    py: 1.5,
                    color: "text.main",
                    backgroundColor: "skyblue",
                    "&:hover": {
                      backgroundColor: "skyblue",
                    },
                  }}
                  value="submit"
                >
                  Edite
                </Button>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </StyledModal>
    </>
  );
}

export default Edite;
