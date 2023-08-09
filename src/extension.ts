import * as vscode from "vscode";
import {VirtualMachineProvider} from "./tree/virtual_machine";
import {Provider} from "./ioc/provider";
import {ParallelsDesktopService} from "./services/parallelsDesktopService";
import {initialize} from "./initialization";
import {registerClearDownloadCacheCommand} from "./commands/clearDownloads";
import {VagrantBoxProvider} from "./tree/vagrant_boxes";
import {
  CommandsFlags,
  FLAG_AUTO_REFRESH,
  FLAG_AUTO_REFRESH_INTERVAL,
  FLAG_PARALLELS_EXTENSION_INITIALIZED,
  TelemetryEventIds
} from "./constants/flags";
import {parallelsOutputChannel} from "./helpers/channel";
import {LogService} from "./services/logService";

let autoRefreshInterval: NodeJS.Timeout | undefined;

export async function activate(context: vscode.ExtensionContext) {
  const provider = new Provider(context);

  // Registering our URI
  const myScheme = "parallels";
  const myProvider = new (class implements vscode.TextDocumentContentProvider {
    // emitter and its event
    onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
    onDidChange = this.onDidChangeEmitter.event;

    provideTextDocumentContent(uri: vscode.Uri): string {
      return `test`;
    }
  })();
  context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(myScheme, myProvider));

  // Registering the  Virtual Machine Provider
  const virtualMachineProvider = new VirtualMachineProvider(context);
  const vagrantBoxProvider = new VagrantBoxProvider(context);

  // Initializing the extension
  await initialize();

  // Setting the auto refresh mechanism
  const settings = Provider.getSettings();
  const config = Provider.getConfiguration();
  setAutoRefresh();

  vscode.workspace.onDidChangeConfiguration(e => {
    if (e.affectsConfiguration("parallels-desktop")) {
      // Re-initialize the extension
      setAutoRefresh();
      vscode.commands.executeCommand(CommandsFlags.treeRefreshVms);
    }
  });

  // Registering global commands
  registerClearDownloadCacheCommand(context);

  if (config.isDebugEnabled) {
    LogService.info("Debug mode is enabled", "CoreService");
  }
  vscode.commands.executeCommand("setContext", FLAG_PARALLELS_EXTENSION_INITIALIZED, true);
  LogService.sendTelemetryEvent(TelemetryEventIds.ExtensionStarted);
  console.log("Parallels Desktop Extension is now active!");
}

function setAutoRefresh() {
  const settings = Provider.getSettings();
  const autoRefresh = settings.get<boolean>(FLAG_AUTO_REFRESH);
  if (autoRefresh) {
    LogService.info("Auto refresh is enabled", "CoreService");
    let interval = settings.get<number>(FLAG_AUTO_REFRESH_INTERVAL);
    if (interval === undefined) {
      LogService.info("Auto refresh interval is not defined, setting default to 60 seconds", "CoreService");
      settings.update(FLAG_AUTO_REFRESH_INTERVAL, 60000);
      interval = 60000;
    }
    if (interval < 10000) {
      LogService.info("Auto refresh interval is too low, setting minimum to 10 seconds", "CoreService");
      settings.update(FLAG_AUTO_REFRESH_INTERVAL, 10000);
      interval = 10000;
    }

    LogService.info("Auto refresh interval is " + interval + "ms", "CoreService");
    autoRefreshInterval = setInterval(() => {
      parallelsOutputChannel.appendLine("Refreshing the virtual machine tree view");
      vscode.commands.executeCommand(CommandsFlags.treeRefreshVms);
      parallelsOutputChannel.appendLine("Refreshing the vagrant box tree view");
      vscode.commands.executeCommand(CommandsFlags.vagrantBoxProviderRefresh);
    }, interval);
  } else {
    if (autoRefreshInterval) {
      clearInterval(autoRefreshInterval);
    }
    LogService.info("Auto refresh is disabled", "CoreService");
  }
}

// This method is called when your extension is deactivated
export function deactivate() {
  console.log("Deactivating Parallels Desktop Extension");
  //TODO: remove all the commands
}
