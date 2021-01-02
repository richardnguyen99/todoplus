import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

interface Props {
  to: string;
  onActive: () => void;
}

const CustomLink: React.FC<Props> = ({ to, onActive, children }) => {
  const location = useLocation();
  const history = useHistory();
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (location.pathname === to) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [location, to]);

  useEffect(() => {
    if (active) {
      onActive();
    }
  }, [onActive, active]);

  return (
    // eslint-disable-next-line react/button-has-type
    <button
      className={`tdp-navbar__item ${active ? "active" : ""}`}
      onClick={(): void => {
        history.push(to);
      }}
    >
      {children}
    </button>
  );
};

export default CustomLink;
