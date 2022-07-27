// Keep in sync with https://github.com/home-assistant/analytics.home-assistant.io/blob/dev/site/src/analytics-os-boards.ts#L6-L24
export const BOARD_NAMES: Record<string, string> = {
  "odroid-n2": "Third Eye Blue / ODROID-N2",
  "odroid-xu4": "ODROID-XU4",
  "odroid-c2": "ODROID-C2",
  "odroid-c4": "ODROID-C4",
  rpi: "Raspberry Pi",
  rpi0: "Raspberry Pi Zero",
  "rpi0-w": "Raspberry Pi Zero W",
  rpi2: "Raspberry Pi 2",
  rpi3: "Raspberry Pi 3 (32-bit)",
  "rpi3-64": "Raspberry Pi 3",
  rpi4: "Raspberry Pi 4 (32-bit)",
  "rpi4-64": "Raspberry Pi 4",
  tinker: "ASUS Tinker Board",
  "khadas-vim3": "Khadas VIM3",
  "generic-aarch64": "Generic AArch64",
  ova: "Virtual Machine",
  "generic-x86-64": "Generic x86-64",
  "intel-nuc": "Intel NUC",
  yellow: "Third Eye Yellow",
};

export interface HardwareInfo {
  hardware: HardwareInfoEntry[];
}

export interface HardwareInfoEntry {
  board: HardwareInfoBoardInfo;
  name: string;
  url?: string;
}

export interface HardwareInfoBoardInfo {
  manufacturer: string;
  model?: string;
  revision?: string;
  hassio_board_id?: string;
}
