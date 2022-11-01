import { IconType } from "react-icons";
import { FiBarChart2, FiShuffle, FiSettings } from "react-icons/fi";

export interface Route {
  name: string;
  heading: string;
  icon: IconType;
  url: string;
}

const routes: Record<string, Route> = {
  "/": {
    url: "/",
    name: "Monitor",
    heading: "Exchange Rates",
    icon: FiBarChart2,
  },
  "/converter": {
    url: "/converter",
    name: "Converter",
    heading: "Currency converter",
    icon: FiShuffle,
  },
  "/settings": {
    url: "/settings",
    name: "Settings",
    heading: "Application Settings",
    icon: FiSettings,
  },
};

export default routes;
