import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";
// import {makeStyles} from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'


const ProgressBar = ({ selectedImage, setSelectedImage }) => {
  const { url, progress } = useStorage(selectedImage);

  useEffect(() => {
    if (url) {
      setSelectedImage("");
    }
  }, [url, setSelectedImage]);

  return <CircularProgress className="progress-bar"  
  value={progress}
  />;
};

export default ProgressBar;
