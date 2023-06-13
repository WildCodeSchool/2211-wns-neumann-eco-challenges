import { RadioButtonUnchecked, CheckCircle } from "@mui/icons-material";
import { Card, Checkbox, Typography, Avatar } from "@mui/material";
import { Ecogesture } from "../../gql/generated/schema";

export const EcogestureItem = ({
  ecogesture,
  isChecked,
  callbackOnClick,
}: {
  ecogesture: Ecogesture;
  isChecked: boolean;
  callbackOnClick: (id: string, checked: boolean) => void;
}) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "14px",
        border: "1px solid #E8E8E8",
        width: "100%",
        paddingY: 1,
        display: "flex",
        alignItems: "center",
        wordBreak: "break-word",
      }}
    >
      <Checkbox
        sx={{
          color: "#E8E8E8",
          transform: "scale(1.1)",
          "&.Mui-checked": {
            color: "#3bd8a9",
          },
        }}
        checked={isChecked}
        icon={<RadioButtonUnchecked />}
        checkedIcon={<CheckCircle />}
        onChange={(e) => callbackOnClick(ecogesture.id, e.target.checked)}
      />
      <Typography variant="body1" fontWeight={600} flexGrow={1}>
        {ecogesture.name}
      </Typography>

      <div style={{ flexBasis: "55px" }}>
        <Avatar
          sx={{
            bgcolor: isChecked ? "black" : "white",
            color: isChecked ? "white" : "black",
            border: `1px solid black`,
            width: 38,
            height: 38,
          }}
        >
          <Typography variant="h6" fontWeight={700}>
            {ecogesture.reward}
          </Typography>
        </Avatar>
      </div>
    </Card>
  );
};
