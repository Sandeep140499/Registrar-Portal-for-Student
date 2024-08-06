import { useState,useEffect } from "react";

const Loader = () => {
  const [loading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);
  return (
    <>
      {loading ? (
        <div id="loader">
          <div className="d-flex flex-column align-items-center">
            <div className="spinner-grow text-gold"></div>
            <span className="text-gold mt-1">Loading...</span>
          </div>
        </div>
      ) : (
        ``
      )}
    </>
  );
};

export default Loader;
