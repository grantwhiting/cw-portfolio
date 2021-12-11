import { useState, useEffect } from "react";

function useMatchMedia(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches) {
      setMatches(media.matches);
    }

    const listener = () => {
      console.log(media.matches);
      setMatches(media.matches);
    };

    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

export default useMatchMedia;
