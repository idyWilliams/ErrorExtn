import * as vscode from "vscode";
import { explainError } from "../ai/explainError.js";
import { getWebviewContent } from "../ui/webview.js";

export function registerExplainErrorCommand(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "errorExplainer.explainError",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {return;}
      const position = editor.selection.active;
      const diagnostics = vscode.languages.getDiagnostics(editor.document.uri);
      const diagnostic = diagnostics.find(
        (d) =>
          d.range.contains(position) &&
          d.severity === vscode.DiagnosticSeverity.Error
      );
      if (!diagnostic) {
        vscode.window.showInformationMessage(
          "No error found at current position"
        );
        return;
      }
      const config = vscode.workspace.getConfiguration("errorExplainer");
      const apiKey = config.get<string>("openaiApiKey") || "";
      const modelName = config.get<string>("modelName") || "gpt-3.5-turbo";
      try {
        const explanation = await explainError(
          diagnostic.message,
          editor.document.getText(),
          apiKey,
          modelName
        );
        const panel = vscode.window.createWebviewPanel(
          "errorExplanation",
          "Error Explanation",
          vscode.ViewColumn.Beside,
          { enableScripts: true }
        );
        panel.webview.html = getWebviewContent(explanation);
      } catch (error) {
        console.error(error);
        vscode.window.showErrorMessage("Failed to get error explanation");
      }
    }
  );
  context.subscriptions.push(disposable);
}
