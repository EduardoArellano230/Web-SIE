import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-ZYXDLFTYMJ"); 
};

export const trackPageView = (path = window.location.pathname) => {
  ReactGA.send({ hitType: "pageview", page: path });
};


