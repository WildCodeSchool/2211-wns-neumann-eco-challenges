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
import { useEffect, useRef, useState } from "react";
import * as LR from "@uploadcare/blocks";

LR.registerBlocks(LR);

const idCallback = (e: any) => {
  const dialog = document
    .querySelector("lr-file-uploader-regular")
    ?.shadowRoot?.querySelector("dialog");

  if (
    dialog != null &&
    dialog.open &&
    e.target.localName !== "lr-file-uploader-regular"
  ) {
    showFileUploader("", false);
  }
};

const showFileUploader = (ecogestureId: string, isVisible: boolean) => {
  const config: any = document.querySelector("lr-config");
  config.metadata = { selectedEcogestureId: ecogestureId };
  const shadowRoot = document.querySelector(
    "lr-file-uploader-regular"
  )?.shadowRoot;
  shadowRoot
    ?.querySelector("lr-start-from")
    ?.setAttribute("active", `${isVisible}`);
  const modal = shadowRoot?.querySelector("dialog");
  if (isVisible) {
    modal?.showModal();
    setTimeout(() => window.addEventListener("click", idCallback), 1000);
  } else {
    modal?.close();
    window.removeEventListener("click", idCallback);
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
  const [proofURL, setProofURL] = useState<string>("");
  const dataOutputRef = useRef<LR.DataOutput>();

  useEffect(() => {
    window.addEventListener("LR_DONE_FLOW", (e) => {
      if (proofURL.length !== 0) {
        // Perform upload
        console.log(`Should upload ${proofURL}`);
        const config: any = document.querySelector("lr-config");
        onSelectedEcogesture(config.metadata.selectedEcogestureId, proofURL);
        setProofURL("");
      }
    });

    return () => {
      window.removeEventListener("click", idCallback);
    };
  }, []);

  const dataOutput = document.querySelector("lr-data-output");
  dataOutput?.addEventListener("lr-data-output", (e: any) => {
    setProofURL(e.detail?.data[0]?.cdnUrl ?? "");
  });

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
          pubkey={process.env.UPLOAD_CARE_PUBLIC_KEY}
          imgOnly={true}
          multiple={false}
          removeCopyright={true}
          source-list="local, camera"
        ></lr-config>

        <div style={{ width: 0, height: 0, opacity: 0 }}>
          <lr-file-uploader-regular
            class="my-config"
            className="toto"
            ctx-name="my-uploader"
            css-src={"/uploader.css"}
          ></lr-file-uploader-regular>
        </div>

        <lr-data-output
          ctx-name="my-uploader"
          ref={dataOutputRef}
          use-event
          hidden
        ></lr-data-output>

        {/* <div>
          {files.map((file) => (
            <img
              key={file.uuid}
              src={`https://ucarecdn.com/${file.uuid}/${
                file.cdnUrlModifiers || ""
              }-/preview/-/scale_crop/400x400/`}
              width="200"
              alt="Preview"
            />
          ))}
        </div> */}
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
