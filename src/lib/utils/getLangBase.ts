import first from "lodash/first";

export default (lang: string) => {
  return first(lang.split("-"));
};
