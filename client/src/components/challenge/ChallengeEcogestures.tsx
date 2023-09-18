import {
  Grid,
  FormGroup,
  FormControlLabel,
  Typography,
  Avatar,
  Stack,
  Chip,
} from "@mui/material";
import { Category, Ecogesture } from "../../gql/generated/schema";
import { EcogestureItem } from "../ecogesture/EcogestureItem";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);

const showFileUploader = (ecogestureId: string, isVisible: boolean) => {
  const config: any = document.querySelector("lr-config");
  config.metadata = { selectedEcogestureId: ecogestureId };
  if (isVisible) {
    const ctxProvider: UploadCtxProvider =
      document.querySelector("#uploaderctx")!;
    ctxProvider.initFlow();
  }
};

export const ChallengeEcogestures = ({
  ecogestures,
  selectedEcogesturesId,
  onSelectedEcogesture,
  isForm = false,
}: {
  ecogestures: Ecogesture[];
  selectedEcogesturesId: string[];
  isForm?: boolean;
  onSelectedEcogesture(ecogestureId: string, proofUrl?: string): void;
}) => {
  const {
    register,
    formState: { errors: formErrors },
  } = useForm();

  const getFilteredEcogestures = () => {
    return selectedCategoryId === "all"
      ? ecogestures
      : ecogestures.filter(({ category: { id } }) => id === selectedCategoryId);
  };

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [categories, setCategories] = useState<Array<Category>>([]);

  ///
  /// On ecogestures loading, parse all ecogestures to get categories.
  /// add an extra category 'all'. All is selected by default.
  ///
  useEffect(() => {
    const categories: Category[] = [{ id: "all", name: "all", icon: "all" }];
    if (ecogestures.length !== 0) {
      ecogestures.forEach(({ category }) => {
        if (categories.find(({ id }) => id === category.id) == null)
          categories.push(category);
      });
    }
    setCategories(categories);
    setSelectedCategoryId("all");
  }, [ecogestures]);

  ///
  /// File uploader
  ///
  let proofUrl = "";
  useEffect(() => {
    window.addEventListener("LR_DONE_FLOW", (e) => {
      if (proofUrl.length !== 0) {
        const config: any = document.querySelector("lr-config");
        onSelectedEcogesture(config.metadata.selectedEcogestureId, proofUrl);
        proofUrl = "";
        const ctxProvider: UploadCtxProvider =
          document.querySelector("#uploaderctx")!;
        ctxProvider.uploadCollection.clearAll();
      }
    });

    window.addEventListener("LR_DATA_OUTPUT", (e: any) => {
      proofUrl = e.detail?.data[0]?.cdnUrl ?? "";
    });
  }, []);

  return (
    <Grid
      item
      container
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      position={"relative"}
      gap={4}
    >
      <div>
        <lr-config
          ctx-name="my-uploader"
          pubkey={process.env.REACT_APP_UPLOADCARE_PUB_KEY}
          imgOnly={true}
          confirm-upload={true}
          multiple={false}
          removeCopyright={true}
          source-list="local, camera"
        ></lr-config>

        <lr-upload-ctx-provider
          id="uploaderctx"
          ctx-name="my-uploader"
        ></lr-upload-ctx-provider>

        <div style={{ width: 0, height: 0, opacity: 0 }}>
          <lr-file-uploader-regular
            class="my-config"
            ctx-name="my-uploader"
            css-src={"/uploader.css"}
          ></lr-file-uploader-regular>
        </div>
      </div>
      <Stack
        width={"100%"}
        direction={"row"}
        overflow={"scroll"}
        sx={{
          "&::-webkit-scrollbar": { display: "none" },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
          "& .MuiStack-root": { scrollbarColor: "red" },
          "& .MuiChip-root": {
            border: "1px solid #DADADA",
            color: "#787878",
            margin: 0,
          },
        }}
      >
        {categories.map(({ name, id, icon }) => (
          <div
            key={id}
            style={{
              minWidth: "33.33%",
              flex: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Chip
              clickable={true}
              onClick={() => setSelectedCategoryId(id)}
              variant="outlined"
              sx={{ border: "1px solid green" }}
              label={name}
              avatar={<Avatar src={icon!}></Avatar>}
            />
          </div>
        ))}
      </Stack>

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
        {getFilteredEcogestures().map((gesture) => (
          <FormControlLabel
            style={{
              margin: 0,
            }}
            control={
              <EcogestureItem
                key={gesture.id}
                callbackOnClick={() => {
                  if (
                    gesture.isProofNeeded &&
                    selectedEcogesturesId.find(
                      (ecogestureId) => ecogestureId === gesture.id
                    ) == null
                  )
                    showFileUploader(gesture.id, true);
                  else onSelectedEcogesture(gesture.id);
                }}
                ecogesture={gesture}
                isChecked={
                  selectedEcogesturesId.find(
                    (ecogestureId) => ecogestureId === gesture.id
                  ) != null
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
