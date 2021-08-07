import Alert from "@material-ui/lab/Alert";

// TODO: change the function name
function InfoMessage(props) {
  return <Alert severity="info">{props.message}</Alert>;
}

export default InfoMessage;
