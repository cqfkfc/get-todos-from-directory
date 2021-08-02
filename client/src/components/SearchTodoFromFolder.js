import { Grid } from "@material-ui/core";
import { useState, useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { fetchData } from '../utils/data';
import TodoResults from "./TodoResults";

// TODO: change the function name
function SearchTodoFromFolder() {
  const [ filteredFiles, setFilteredFiles] = useState([])
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({maxFiles: 1000});

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


  useEffect(()=>{
    fetchData(acceptedFiles).then(data=>setFilteredFiles(data));
  },[acceptedFiles])

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
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
      <TodoResults files={filteredFiles} />
    </Grid>
    );
}

export default SearchTodoFromFolder;
