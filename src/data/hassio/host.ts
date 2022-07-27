import { atLeastVersion } from "../../common/config/version";
import { ThirdEye } from "../../types";
import { hassioApiResultExtractor, HassioResponse } from "./common";

export type HassioHostInfo = {
  agent_version: string;
  chassis: string;
  cpe: string;
  deployment: string;
  disk_life_time: number | "";
  disk_free: number;
  disk_total: number;
  disk_used: number;
  features: string[];
  hostname: string;
  kernel: string;
  operating_system: string;
  boot_timestamp: number;
  startup_time: number;
};

export interface HassioHassOSInfo {
  board: string | null;
  boot: string | null;
  update_available: boolean;
  version_latest: string | null;
  version: string | null;
  data_disk: string;
}

export interface DatadiskList {
  devices: string[];
}

export const fetchHassioHostInfo = async (
  hass: ThirdEye
): Promise<HassioHostInfo> => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/host/info",
      method: "get",
    });
  }

  const response = await hass.callApi<HassioResponse<HassioHostInfo>>(
    "GET",
    "hassio/host/info"
  );
  return hassioApiResultExtractor(response);
};

export const fetchHassioHassOsInfo = async (
  hass: ThirdEye
): Promise<HassioHassOSInfo> => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/os/info",
      method: "get",
    });
  }

  return hassioApiResultExtractor(
    await hass.callApi<HassioResponse<HassioHassOSInfo>>(
      "GET",
      "hassio/os/info"
    )
  );
};

export const rebootHost = async (hass: ThirdEye) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/host/reboot",
      method: "post",
      timeout: null,
    });
  }

  return hass.callApi<HassioResponse<void>>("POST", "hassio/host/reboot");
};

export const shutdownHost = async (hass: ThirdEye) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/host/shutdown",
      method: "post",
      timeout: null,
    });
  }

  return hass.callApi<HassioResponse<void>>("POST", "hassio/host/shutdown");
};

export const updateOS = async (hass: ThirdEye) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/os/update",
      method: "post",
      timeout: null,
    });
  }

  return hass.callApi<HassioResponse<void>>("POST", "hassio/os/update");
};

export const configSyncOS = async (hass: ThirdEye) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/os/config/sync",
      method: "post",
      timeout: null,
    });
  }

  return hass.callApi<HassioResponse<void>>("POST", "hassio/os/config/sync");
};

export const changeHostOptions = async (hass: ThirdEye, options: any) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/host/options",
      method: "post",
      data: options,
    });
  }

  return hass.callApi<HassioResponse<void>>(
    "POST",
    "hassio/host/options",
    options
  );
};

export const moveDatadisk = async (hass: ThirdEye, device: string) => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS({
      type: "supervisor/api",
      endpoint: "/os/datadisk/move",
      method: "post",
      timeout: null,
      data: { device },
    });
  }

  return hass.callApi<HassioResponse<void>>("POST", "hassio/os/datadisk/move");
};

export const listDatadisks = async (
  hass: ThirdEye
): Promise<DatadiskList> => {
  if (atLeastVersion(hass.config.version, 2021, 2, 4)) {
    return hass.callWS<DatadiskList>({
      type: "supervisor/api",
      endpoint: "/os/datadisk/list",
      method: "get",
      timeout: null,
    });
  }

  return hassioApiResultExtractor(
    await hass.callApi<HassioResponse<DatadiskList>>("GET", "/os/datadisk/list")
  );
};
