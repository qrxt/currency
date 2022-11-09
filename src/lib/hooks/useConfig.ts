import config from "../../config.json";

function useConfig() {
  const envs = import.meta.env;
  return { config, envs };
}

export default useConfig;
