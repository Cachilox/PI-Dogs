import { useState, useEffect } from "react";

export const useLoading = (time = 800) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, `${time}`);
  }, [time]);

  return {loading};
}