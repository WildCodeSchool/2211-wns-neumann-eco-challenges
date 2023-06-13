import { Grid, FormGroup, FormControlLabel, Typography } from "@mui/material";
import { Ecogesture } from "../../gql/generated/schema";
import { EcogestureItem } from "../ecogesture/EcogestureItem";
import { useForm } from "react-hook-form";

export const ChallengeEcogestures = ({
  ecogestures,
  selectedEcogesturesId,
  onSelectedEcogesture,
  isForm = false,
}: {
  ecogestures: Ecogesture[];
  selectedEcogesturesId: string[];
  isForm?: boolean;
  onSelectedEcogesture(ecogestureId: string): void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  return (
    <Grid item>
      <FormGroup
        {...register("list", {
          validate: {
            atLeastOneSelected: () =>
              isForm ? selectedEcogesturesId.length !== 0 : true,
          },
        })}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {ecogestures.map((gesture) => (
          <FormControlLabel
            style={{
              margin: 0,
            }}
            control={
              <EcogestureItem
                key={gesture.id}
                callbackOnClick={() => {
                  onSelectedEcogesture(gesture.id);
                }}
                ecogesture={gesture}
                isChecked={
                  selectedEcogesturesId.findIndex(
                    (ecogestureId) => ecogestureId === gesture.id
                  ) !== -1
                }
              />
            }
            label={undefined}
          />
        ))}
        {formErrors["list"] && (
          <Typography
            variant="caption"
            color="#ba000d"
            display="block"
            gutterBottom
            paddingLeft={"14px"}
          >
            Select at least one ecogesture.
          </Typography>
        )}
      </FormGroup>
    </Grid>
  );
};
