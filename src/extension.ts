import * as vscode from 'vscode';

const he = require("he");

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.unicodeConverter",
    () => {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return;
      }

      const configruation = vscode.workspace.getConfiguration(
        "unicodeConverter"
      );
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      editor.edit(builder => {
        builder.replace(
          selection,
          he.encode(text, {
            useNamedReferences: configruation.get("encode.useNamedReferences"),
            decimal: configruation.get("encode.decimal"),
            allowUnsafeSymbols: configruation.get("encode.allowUnsafeSymbols")
          })
        );
      });
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
