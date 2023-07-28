import * as LR from "@uploadcare/blocks";
import { useCallback, useRef, useState } from "react";

LR.registerBlocks(LR);

export const ImageUploader = () => {
  const dataOutputRef = useRef<LR.DataOutput>();

  const [files, setFiles] = useState<any[]>([]);

  const handleUploaderEvent = useCallback((e: CustomEvent<any>) => {
    const { data } = e.detail;
    setFiles(data);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gridGap: 32,
        padding: 32,
      }}
    >
      <lr-config
        ctx-name="my-uploader"
        pubkey="d3e850d949e62ece4422"
        multiple={false}
        source-list="local, camera"
      ></lr-config>

      <lr-file-uploader-regular
        ctx-name="my-uploader"
        css-src="https://cdn.jsdelivr.net/npm/@uploadcare/blocks@0.25.1/web/lr-file-uploader-regular.min.css"
      ></lr-file-uploader-regular>

      <lr-data-output
        ctx-name="my-uploader"
        ref={dataOutputRef}
        use-event
        onEvent={handleUploaderEvent}
      ></lr-data-output>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto-fit, minmax(200px, 1fr)",
          width: "100%",
          maxWidth: 1000,
        }}
      >
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
      </div>
    </div>
  );
};
