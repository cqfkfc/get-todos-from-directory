import { List, ListItem, ListItemIcon, Typography } from "@material-ui/core";
import { Folder } from "@material-ui/icons";

// TODO: change the function name
function DisplayFileResults(props) {
  const { inputFiles, outputFiles } = props;

  return (
    <div data-testid="results">
      <Typography data-testid="msg-to-users" variant="h5">
        Out of the {inputFiles.length ? inputFiles.length : "no"} file
        {inputFiles.length === 1 ? "" : "s"} you uploaded,{" "}
        {outputFiles.length ? outputFiles.length : "no"} file
        {outputFiles.length === 1 ? "" : "s"} contained TODOs.
      </Typography>
      <List>
        {props.outputFiles.map((outputFile) => (
          <ListItem key={outputFile}>
            <ListItemIcon>
              <Folder />
            </ListItemIcon>
            {outputFile}
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default DisplayFileResults;
