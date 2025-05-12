# ErrorExplainer

A VS Code extension that provides AI-powered explanations for code errors. Simply hover over any error in your code to get a detailed, human-friendly explanation of what went wrong and how to fix it.

## Features

- 🔍 **Smart Error Detection**: Automatically detects errors in your code
- 🤖 **AI-Powered Explanations**: Uses OpenAI's GPT models to provide clear, contextual explanations
- 💡 **Solution Suggestions**: Offers practical solutions and best practices
- 🎯 **Multiple Ways to Access**: Hover over errors or use the command palette
- 🌈 **Beautiful UI**: Clean, modern interface that matches VS Code's theme

## Installation

1. Open VS Code
2. Go to the Extensions view (Ctrl+Shift+X / Cmd+Shift+X)
3. Search for "ErrorExplainer"
4. Click Install

## Configuration

Before using the extension, you need to set up your OpenAI API key:

1. Get an API key from [OpenAI](https://platform.openai.com/api-keys)
2. Open VS Code Settings (Ctrl+, / Cmd+,)
3. Search for "ErrorExplainer"
4. Enter your OpenAI API key in the "OpenAI API Key" field

## Usage

### Automatic Error Explanation

Simply hover over any error in your code to see an AI-generated explanation.

### Manual Error Explanation

1. Place your cursor on the line with the error
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type "Explain Error" and select the command

## Features in Detail

### Error Explanations Include:

- What the error means in simple terms
- Why this error typically occurs
- How to fix it
- Best practices to avoid this error

### Supported Languages

The extension works with all programming languages supported by VS Code.

## Requirements

- VS Code 1.100.0 or higher
- OpenAI API key
- Internet connection for AI-powered explanations

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

- `myExtension.enable`: Enable/disable this extension.
- `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

- [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

- Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
- Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
- Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

- [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
- [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
