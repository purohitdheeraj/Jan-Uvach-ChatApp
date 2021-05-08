import { useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setdocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let docFiles = [];
        snap.forEach((doc) => {
          docFiles.push({ ...doc.data(), id: doc.id });
        });
        setdocs(docFiles);
      });

    return () => unsub();
  }, [collection]);

  return { docs };
};

export default useFirestore;
