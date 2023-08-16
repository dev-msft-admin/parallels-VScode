import {VirtualMachineAdvancedConfig} from "./VirtualMachineAdvancedConfig";
import {VirtualMachineCoherence} from "./VirtualMachineCoherence";
import {VirtualMachineExpiration} from "./VirtualMachineExpiration";
import {VirtualMachineFullscreen} from "./VirtualMachineFullscreen";
import {VirtualMachineGuestTools} from "./VirtualMachineGuestTools";
import {VirtualMachineHardware} from "./VirtualMachineHardware";
import {VirtualMachineMiscellaneousSharing} from "./VirtualMachineMiscellaneousSharing";
import {VirtualMachineModality} from "./VirtualMachineModality";
import {VirtualMachineMouseAndKeyboard} from "./VirtualMachineMouseAndKeyboard";
import {VirtualMachineOptimization} from "./VirtualMachineOptimization";
import {VirtualMachineSMBIOSSettings} from "./VirtualMachineSMBIOSSettings";
import {VirtualMachineSecurity} from "./VirtualMachineSecurity";
import {VirtualMachineSharedApplications} from "./VirtualMachineSharedApplications";
import {VirtualMachineSmartMount} from "./VirtualMachineSmartMount";
import {VirtualMachineStartupAndShutdown} from "./VirtualMachineStartupAndShutdown";
import {VirtualMachineTimeSynchronization} from "./VirtualMachineTimeSynchronization";
import {VirtualMachineTravelMode} from "./VirtualMachineTravelMode";
import {VirtualMachineUSBAndBluetooth} from "./VirtualMachineUSBAndBluetooth";
import {DockerContainer} from "./dockerContainer";
import { DockerImage } from "./dockerImage";

export interface VirtualMachine {
  ID: string;
  group: string;
  hidden: boolean;
  dockerContainers: DockerContainer[];
  dockerImages: DockerImage[];
  Name: string;
  Description: string;
  Type: string;
  State: string;
  OS: string;
  Template: string;
  Uptime: string;
  "Home path": string;
  Home: string;
  GuestTools: VirtualMachineGuestTools;
  "Mouse and Keyboard": VirtualMachineMouseAndKeyboard;
  "USB and Bluetooth": VirtualMachineUSBAndBluetooth;
  "Startup and Shutdown": VirtualMachineStartupAndShutdown;
  Optimization: VirtualMachineOptimization;
  "Travel mode": VirtualMachineTravelMode;
  Security: VirtualMachineSecurity;
  "Smart Guard": VirtualMachineExpiration;
  Modality: VirtualMachineModality;
  Fullscreen: VirtualMachineFullscreen;
  Coherence: VirtualMachineCoherence;
  "Time Synchronization": VirtualMachineTimeSynchronization;
  Expiration: VirtualMachineExpiration;
  "Boot order": string;
  "BIOS type": string;
  "EFI Secure boot": string;
  "Allow select boot device": string;
  "External boot device": string;
  "SMBIOS settings": VirtualMachineSMBIOSSettings;
  Hardware: VirtualMachineHardware;
  "Host Shared Folders": VirtualMachineExpiration;
  "Host defined sharing": string;
  "Shared Profile": VirtualMachineExpiration;
  "Shared Applications": VirtualMachineSharedApplications;
  SmartMount: VirtualMachineSmartMount;
  "Miscellaneous Sharing": VirtualMachineMiscellaneousSharing;
  Advanced: VirtualMachineAdvancedConfig;
}
