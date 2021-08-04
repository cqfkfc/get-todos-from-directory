import { Grid, Typography } from "@material-ui/core";
import { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { fetchData } from '../utils/Data';
import TodoResults from "./TodoResults";
import InfoMessage from "./InfoMessage";

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
}; 

const maxFilesAllowed = 1000;

// TODO: change the function name
function SearchTodoFromFolder() {
  const [ filesWithTodo, setFilesWithTodo] = useState([])
  const [ filesUploaded, setFilesUploaded] = useState(false); 
  const infoMessage = 'The maximum number of files allowed is '+maxFilesAllowed+'.'
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({maxFiles: maxFilesAllowed});

  useEffect(()=>{
    if (acceptedFiles.length !== 0) {
      fetchData(acceptedFiles).then(data=>{
        setFilesWithTodo(data.data)
        setFilesUploaded(true)
      });  
    }
  },[acceptedFiles])

  const style = useMemo(() => ({
    ...baseStyle,
  }), [
  ]);


  return (
    <Grid container>
      <Grid item xs={12}>
      <div {...getRootProps({style})}>
        
        <input 
        data-testid="upload-folder"
        webkitdirectory="" // this attribute enables upload of directory instead of file
        {...getInputProps()} 
        />
        <p>Drag and drop your folder here to find files containing TODOs</p>
      </div>

      </Grid>
      {!filesUploaded && <InfoMessage message={infoMessage} />}
      
      
      {filesUploaded && <Grid item xs={12}>
        <TodoResults files={filesWithTodo} inputFiles={acceptedFiles}/>
      </Grid>}
    
    </Grid>
    );
}

export default SearchTodoFromFolder;
