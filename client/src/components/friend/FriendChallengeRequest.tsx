import { Button, Icon, IconButton, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { withStyles } from "@mui/styles";
import SendIcon from "@mui/icons-material/Send";

const StyledTextField = withStyles({
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderRadius: `20px`,
        boxShadow: "1px 3px 3px rgba(0,0,0,0.1)",
        border: 0,
      },
    },
  },
})(TextField);

export const FriendChallengeRequest = () => {
  return (
    <Grid container rowSpacing={2}>
      <Grid item xs={12}>
        <Typography fontWeight={700} className="darkBlueColor">
          {`Want to challenge a new`}
        </Typography>
        <Typography fontWeight={700} className="darkBlueColor">
          {`friend?`}
        </Typography>
      </Grid>
      <Grid item xs={9.5}>
        <StyledTextField
          fullWidth={true}
          sx={{}}
          placeholder="Enter email address"
        />
      </Grid>
      <Grid item display="flex" justifyContent="flex-end" xs={2.5}>
        <Button
          variant="contained"
          sx={{
            ":hover": { background: "rgba(16,68,85,0.63)" },
            width: "50px",
            borderRadius: "15px",
            backgroundColor: "rgba(16,68,85,0.63)",
          }}
        >
          <SendIcon
            sx={{
              transform: "rotate(-45deg)",
              color: "white",
            }}
          />
        </Button>
      </Grid>
    </Grid>
  );
};
