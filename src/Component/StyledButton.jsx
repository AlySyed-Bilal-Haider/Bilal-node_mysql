import { Button } from "@mui/material";

export default function StyledButton({ children, ...props }) {
  return (
    <>
      <Button
        {...props}
        sx={{
          color: "#fff",
          background: "#4602A0",
          fontSize: "18px",
          textTransform: "capitalize",
          fontFamily: "Ubuntu",
          borderRadius: "12px",
          width: props.width,
          "&.Mui-disabled": {
            color: "#979EA7",
          },
          "&:hover": {
            background: "#3B0049",
          },
        }}
      >
        {children}
      </Button>
    </>
  );
}
