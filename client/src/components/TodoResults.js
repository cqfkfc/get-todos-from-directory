import { List, ListItem, ListItemIcon, Typography } from "@material-ui/core";
import { Folder } from '@material-ui/icons'

// TODO: change the function name
function TodoResults(props) {
  return (
      <div data-testid="results">
        <Typography variant="subtitle1">{props.msg}</Typography>
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
