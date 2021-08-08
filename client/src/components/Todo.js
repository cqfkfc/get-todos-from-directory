import { Grid } from "@material-ui/core";
import { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { fetchData } from "../utils/data";
import DisplayFileResults from "./DisplayFileResults";
import InfoMessage from "./InfoMessage";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const maxFilesAllowed = 1000;

// TODO: change the function name
function Todo() {
  const [filesWithTodo, setFilesWithTodo] = useState([]);
  const [filesUploaded, setFilesUploaded] = useState(false);
  const message =
    "Max number of files allowed is " +
    maxFilesAllowed +
    ". Supported for Google Chrome and Firefox (Desktop)";
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({});

  useEffect(() => {
    if (acceptedFiles.length !== 0) {
      fetchData(acceptedFiles.slice(0, maxFilesAllowed)).then((data) => {
        setFilesWithTodo(data.data);
        setFilesUploaded(true);
      });
    }
  }, [acceptedFiles]);

  const style = useMemo(
    () => ({
      ...baseStyle,
    }),
    []
  );

  return (
    <Grid container>
      <Grid item xs={12}>
        <div {...getRootProps({ style })}>
          <input
            data-testid="upload-folder"
            type="file"
            multiple
            directory="" // this attribute enables upload of directory instead of file
            mozdirectory="" // this attribute enables upload of directory instead of file
            webkitdirectory="" // this attribute enables upload of directory instead of file
            {...getInputProps()}
          />
          <p>Drag and drop your folder here to find files containing TODOs</p>
        </div>
      </Grid>
      {!filesUploaded && <InfoMessage message={message} />}

      {filesUploaded && (
        <Grid item xs={12}>
          <DisplayFileResults
            outputFiles={filesWithTodo}
            inputFiles={acceptedFiles.slice(0, maxFilesAllowed)}
          />
        </Grid>
      )}
    </Grid>
  );
}

export default Todo;
