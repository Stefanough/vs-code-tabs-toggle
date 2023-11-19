// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

type BarsVisibilityState = "all" | "breadcrumbsAndTabs" | "tabs" | "none";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors
  // (console.error). This line of code will only be executed once when your
  // extension is activated
  console.log('Congratulations, your extension "tabs-toggle" is now active!');

  function tabsBarVisible() {
    // returns true if the editor tabs bar is visible
    return vscode.workspace.getConfiguration()
      .get("workbench.editor.showTabs") === "none" ? false : true;
  }

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const toggleTabsBar = vscode.commands.registerCommand(
    'tabs-toggle.toggleTabs',
    () => {
      // The code you place here will be executed every time your command is
      // executed

      // if editor tabs bar is visible, hide it
      if (
        vscode.workspace.getConfiguration()
          .get("workbench.editor.showTabs") === "multiple"
      ) {
        // config.workbench.editor.showTabs: "multiple"
        // editorTabsVisible: true
        vscode.workspace.getConfiguration()
          .update("workbench.editor.showTabs", "none", true);
      }
      // if editor tabs bar is hidden, show it
      else {
        // config.workbench.editor.showTabs: "none"
        // editorTabsVisible: false
        vscode.workspace.getConfiguration()
          .update("workbench.editor.showTabs", "multiple", true);
      }
    });

  const cycleBar = vscode.commands.registerCommand(
    'tabs-toggle.cycleBar',
    () => {
      // switch case for cycling through the different states of the editor tabs
      // bar

      // variable to hold the current state of the editor status bar
      const statusBarVisible = vscode.workspace.getConfiguration()
        .get("workbench.statusBar.visible");

      console.log({ statusBarVisible });

      // variable to hold the current state of editor breadcrumbs
      const breadcrumbsVisible = vscode.workspace.getConfiguration()
        .get("breadcrumbs.enabled");

      console.log({ breadcrumbsVisible });

      // variable to hold the current state of the editor tabs bar
      const editorTabsVisible = tabsBarVisible();

      console.log({ editorTabsVisible });

      const barsVisibilityState: BarsVisibilityState = (
        // statusBarVisible && breadcrumbsVisible && editorTabsVisible ? "all"
        statusBarVisible ? "all"
          : breadcrumbsVisible && editorTabsVisible ? "breadcrumbsAndTabs"
            : editorTabsVisible ? "tabs"
              : "none"
      );

      console.log(barsVisibilityState);

      switch (barsVisibilityState) {
        case 'all':
          // hide status bar
          vscode.workspace.getConfiguration()
            .update("workbench.statusBar.visible", false, true);
          break;

        case 'breadcrumbsAndTabs':
          // hide breadcrumbs
          vscode.workspace.getConfiguration()
            .update("breadcrumbs.enabled", false, true);
          break;

        case 'tabs':
          // hide editor tabs bar
          vscode.workspace.getConfiguration()
            .update("workbench.editor.showTabs", "none", true);
          break;

        case 'none':
          // show status bar and breadcrumbs and editor tabs bar
          vscode.workspace.getConfiguration()
            .update("workbench.statusBar.visible", true, true);
          vscode.workspace.getConfiguration()
            .update("breadcrumbs.enabled", true, true);
          vscode.workspace.getConfiguration()
            .update("workbench.editor.showTabs", "multiple", true);
          break;

        default:
          // show error message if none of the above cases are met
          vscode.window.showErrorMessage(
            "Error: Could not cycle through the editor bars"
          );
          break;
      }
    }
  );

  context.subscriptions.push(toggleTabsBar, cycleBar);
}

// This method is called when your extension is deactivated
export function deactivate() { }
