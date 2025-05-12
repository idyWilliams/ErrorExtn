// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { explainError } from "./ai/explainError.js";
import { getHoverBranding } from "./ui/hoverBranding.js";
import { registerExplainErrorCommand } from "./commands/explainErrorCommand.js";
import { HumanMessage, SystemMessage } from "langchain/schema";
import { ChatOpenAI } from "langchain/chat_models/openai";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  // Register hover provider
  const hoverProvider = vscode.languages.registerHoverProvider("*", {
    async provideHover(document, position, token) {
      const diagnostics = vscode.languages.getDiagnostics(document.uri);
      const diagnostic = diagnostics.find(
        (d) =>
          d.range.contains(position) &&
          d.severity === vscode.DiagnosticSeverity.Error
      );

      if (!diagnostic) {
        return null;
      }

      const config = vscode.workspace.getConfiguration("errorExplainer");
      const apiKey =
        config.get<string>("openaiApiKey") || process.env.OPENAI_API_KEY || "";
      const modelName = config.get<string>("modelName") || "gpt-3.5-turbo";

      try {
        const explanation = await explainError(
          diagnostic.message,
          document.getText(),
          apiKey,
          modelName
        );
        const markdown = new vscode.MarkdownString();
        markdown.appendMarkdown("### Error Explanation\n\n");
        markdown.appendMarkdown(explanation);
        markdown.appendMarkdown(getHoverBranding());
        return new vscode.Hover(markdown, diagnostic.range);
      } catch (error) {
        console.error("Error getting explanation:", error);
        return null;
      }
    },
  });

  context.subscriptions.push(hoverProvider);

  // Register command to manually explain error
  registerExplainErrorCommand(context);
}

async function getErrorExplanation(
  errorMessage: string,
  codeContext: string,
  apiKey: string,
  modelName: string
): Promise<string> {
  const messages = [
    new SystemMessage(`You are an expert programming assistant. Your task is to explain errors in a clear,
		concise, and helpful way. Focus on:
		1. What the error means in simple terms
		2. Why this error typically occurs
		3. How to fix it
		4. Best practices to avoid this error

		Keep the explanation friendly and practical.`),
    new HumanMessage(
      `Error: ${errorMessage}\n\nCode Context:\n${codeContext}\n\nPlease explain this error.`
    ),
  ];

  const chatModel = new ChatOpenAI({
    openAIApiKey: apiKey,
    modelName: modelName,
    temperature: 0,
  });
  const response = await chatModel.call(messages);
  let content = response.content;
  if (Array.isArray(content)) {
    content = content.join(" ");
  }
  return typeof content === "string" ? content : String(content);
}

function getWebviewContent(explanation: string): string {
  return `<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<style>
				body {
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
					padding: 20px;
					line-height: 1.6;
				}
				.explanation {
					background-color: var(--vscode-editor-background);
					color: var(--vscode-editor-foreground);
					padding: 20px;
					border-radius: 6px;
					border: 1px solid var(--vscode-panel-border);
				}
			</style>
		</head>
		<body>
			<div class="explanation">
				${explanation}
			</div>
		</body>
	</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
