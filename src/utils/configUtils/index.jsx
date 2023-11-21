import config from "@src/config";

export function getBaseUrl() {
  return config.development.baseUrl;
}
