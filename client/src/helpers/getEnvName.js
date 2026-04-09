export const getEnvName = (envName) => {
  const env = import.meta.env;
  return env[envName];
};
