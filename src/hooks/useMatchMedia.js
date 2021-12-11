import { useState, useEffect } from "react";

function useMatchMedia(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (media.matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);

    media.addEventListener(listener);

    return () => media.removeEventListener(listener);
  }, [matches, query]);

  return matches;
}

export default useMatchMedia;
