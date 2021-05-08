import {
    projectStorage,
    projectFirestore,
    timestamp
  } from "../firebase/config";
  import { useEffect, useState } from "react";
  
  const useStorage = (file) => {
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const storageRef = projectStorage.ref(file.name);
      const collectionRef = projectFirestore.collection("image-gallery");
      storageRef.put(file).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const url = await storageRef.getDownloadURL();
          const createdAt = timestamp();
          collectionRef.add({ url, createdAt});
          setUrl(url);
        }
      );
    }, [file]);
  
    return { url, progress, error };
  };
  
  export default useStorage;
  