import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Divider,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import axios from "axios";
import StyledButton from "./StyledButton";
const TextInput = styled(InputBase)({
  "& .MuiInputBase-input": {
    position: "relative",
    borderRadius: "5px",
    fontSize: "14px",
    color: "#202020",
    backgroundColor: "#f5f5f5",
    padding: "10px",
    paddingLeft: "10px",
    fontFamily: "Ubuntu",
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

export default function Add() {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [name, setnameState] = useState("");
  const [alertState, setAlertState] = useState({
    open: false,
    message: "",
    severity: undefined,
  });

  const baseURL = "http://localhost:8080";

  const handleSignUp = async () => {
    if (!email || !password) {
      setAlertState({
        open: true,
        message: "please enter your email address or password",
        severity: "error",
      });
    } else {
      try {
        let { data } = await axios.post(`${baseURL}/save`, {
          name,
          email,
          password,
        });
        console.log("data response:", data);
        if (data.success) {
          alert("add user succefully !");
          setAlertState({
            open: true,
            message: data.message,
            severity: "success",
          });
          setPassword("");
          setconfirmPassword("");
          setnameState("");
          setPassword("");
        } else {
          setAlertState({
            open: true,
            message: data.message,
            severity: "error",
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    if (password !== confirmPassword) {
      setError("Password not matched.");
    } else {
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmPassword]);

  return (
    <>
      <Box
        mx={2}
        sx={{
          p: 2,
          mt: 3,
          boxShadow: "4px 4px 5px lightgray,-4px -4px 5px lightgray",
        }}
      >
        <Box mt={3}>
          <Typography
            fontFamily="Ubuntu"
            ml={1}
            mb={0.5}
            variant="body1"
            color="#6A0E7B"
          >
            Name:
          </Typography>

          <TextInput
            type="text"
            fullWidth
            placeholder="Enter your name !"
            onChange={(e) => {
              setnameState(e.target.value);
            }}
          />
        </Box>

        <Box mt={2}>
          <Typography
            fontFamily="Ubuntu"
            ml={1}
            mb={0.5}
            variant="body1"
            color="#6A0E7B"
          >
            Email
          </Typography>
          <TextInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            placeholder="abc@gmail.com"
          />
        </Box>

        <Box mt={2}>
          <Typography
            fontFamily="Ubuntu"
            ml={1}
            mb={0.5}
            variant="body1"
            color="#6A0E7B"
          >
            Password
          </Typography>
          <TextInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            placeholder="password"
          />
        </Box>

        <Box mt={2}>
          <Typography
            fontFamily="Ubuntu"
            ml={1}
            mb={0.5}
            variant="body1"
            color="#6A0E7B"
          >
            Confirm Password:
          </Typography>
          <TextInput
            type="password"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            fullWidth
            placeholder="Confirm password"
          />
        </Box>

        <Typography
          my={3}
          textAlign="right"
          variant="subtitle2"
          color="#979EA7"
          fontFamily="Ubuntu"
        >
          Already have account?{" "}
          <span
            style={{
              fontWeight: "700",
              fontSize: "15px",
              color: "#6A0E7B",
              cursor: "pointer",
              fontFamily: "Ubuntu",
            }}
          >
            Log In
          </span>
        </Typography>
      </Box>

      <Divider />
      <Box my={2} textAlign="center">
        <StyledButton
          width="150px"
          onClick={(e) => {
            e.preventDefault();
            handleSignUp();
          }}
        >
          Submit
        </StyledButton>
      </Box>
    </>
  );
}
