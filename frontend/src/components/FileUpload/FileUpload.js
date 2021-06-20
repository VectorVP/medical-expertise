import { useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import ButtonBase from "@material-ui/core/ButtonBase";
import { setImage } from '../../actions/qualityActions'

const FileInput = ({ label, error }) => {
  const dispatch = useDispatch()
  const ref = useRef();
  const theme = useTheme();
  const classes = useStyles();

  const qualityImage = useSelector(state => state.qualityImage)
  const { image } = qualityImage

  const handleChange = (e) => {
    let files = e.target.files
    const formData = new FormData()
    formData.append('epikris', files[0])
    dispatch(setImage(formData));
  };

  return (
    <Box
      position="relative"
      height={60}
      color={
        !!error ? theme.palette.error.main : theme.palette.background.paper
      }
      borderBottom={60}
      width={220}
      style={{border:"0px solid black", borderRadius:"15px", marginLeft:"30px", backgroundColor:"#3F8CFF"}}
    >
      <Box position="absolute" top={0} bottom={0} left={10} right={50} mx={2}>
        <TextField
          className={classes.field}
          InputProps={{ disableUnderline: true }}
          margin="normal"
          fullWidth
          disabled
          label={label}
          value={image?.name || ""}
          error={!!error}
          helperText={error?.message || " "}
        />
      </Box>
      <ButtonBase
        className={classes.button}
        component="label"
        onKeyDown={(e) => e.keyCode === 32 && ref.current?.click()}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          hidden
          onChange={handleChange}
        />
      </ButtonBase>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  field: {
    "& .MuiFormLabel-root.Mui-disabled": {
      color: theme.palette.text.secondary,
    },
    fontSize:"25px",
    display: "flex",
  },
  button: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
}));

export default FileInput;