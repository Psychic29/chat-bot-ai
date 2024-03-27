import { TextField } from "@mui/material";

type Props = {
  name: string;
  type: string;
  label: string;
};

const CustomizedInput = (props: Props) => {
  return (
    <TextField
    margin="normal"
      InputLabelProps={{ style: { color: "white" } }}
      type={props.type}
      name={props.name}
      label={props.label}
      InputProps={{
        style: {
          color: "white",
          width: "350px",
          borderRadius: 10,
          fontSize: 20
        }
      }}
    />
  );
};

export default CustomizedInput;
