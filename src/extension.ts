// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

type BarsVisibilityState = "all" | "breadcrumbsAndTabs" | "tabs" | "none";

function restoreUIElements(): void {
  // restore status bar
  vscode.workspace.getConfiguration()
    .update("workbench.statusBar.visible", true, true);

  // restore breadcrumbs
  vscode.workspace.getConfiguration()
    .update("breadcrumbs.enabled", true, true);

  // restore editor tabs bar
  vscode.workspace.getConfiguration()
    .update("workbench.editor.showTabs", "multiple", true);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const restoreUIElementsCommand = vscode.commands.registerCommand(
    'tabs-toggle.restoreUIElements',
    () => {
      restoreUIElements();
    }
  );

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
      // current state of the editor status bar
      const statusBarVisible = vscode.workspace.getConfiguration()
        .get("workbench.statusBar.visible");

      // current state of editor breadcrumbs
      const breadcrumbsVisible = vscode.workspace.getConfiguration()
        .get("breadcrumbs.enabled");

      // current state of the editor tabs bar
      const editorTabsVisible = vscode.workspace.getConfiguration()
        .get("workbench.editor.showTabs") === "none" ? false : true;

      const barsVisibilityState: BarsVisibilityState = (
        statusBarVisible && breadcrumbsVisible && editorTabsVisible ? "all"
          : breadcrumbsVisible && editorTabsVisible ? "breadcrumbsAndTabs"
            : editorTabsVisible ? "tabs"
              : "none"
      );

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
          restoreUIElements();

        default:
          vscode.window.showErrorMessage(
            `Error: Could not determine the current state of the editor tabs or
            status bars. Use the restoreUIElementsCommand to restore
            visibility.`
          );
          break;
      }
    }
  );

  context.subscriptions.push(toggleTabsBar, cycleBar, restoreUIElementsCommand);
}

// This method is called when your extension is deactivated
export function deactivate() { }
