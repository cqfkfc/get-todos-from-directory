import { List, ListItem, ListItemIcon, Typography } from "@material-ui/core";
import { Folder } from '@material-ui/icons'

// TODO: change the function name
function TodoResults(props) {

  const {inputFiles, files} = props

  return (
      <div data-testid="results">
        <Typography data-testid="msg-to-users" variant="subtitle1">
        Out of the {inputFiles.length} file{inputFiles.length>1 ? 's': ''} you uploaded, {files.length} file{files.length>1 ? 's': ''} contained TODOS. 
        </Typography>
        <List
        >{props.files.map(file => (
    <ListItem key={file}>
      <ListItemIcon>
        <Folder/>
      </ListItemIcon>
      {file} 
    </ListItem>
  ))}</List>
     
      </div>
    );
}

export default TodoResults;
