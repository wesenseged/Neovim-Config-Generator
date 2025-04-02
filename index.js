import "dotenv/config";
import chalk from "chalk";
import * as p from "@clack/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";

function formatOutput(output) {
  const lines = output.split("\n");

  const formattedLines = lines.map((line) => {
    if (line.startsWith("## ")) {
      return chalk.bold.cyan(line);
    }

    if (line.startsWith("```")) {
      return chalk.gray(line);
    }

    if (line.startsWith("- ")) {
      return chalk.green(line);
    }

    if (line.includes(":")) {
      const [key, value] = line.split(":");
      return chalk.yellow(key) + ":" + chalk.white(value);
    }

    return chalk.white(line);
  });

  return formattedLines.join("\n");
}

async function sendRequest(prompt) {
  const spinner = p.spinner();
  spinner.start("Generating Config ....");

  try {
    const genAI = new GoogleGenerativeAI(process.env.YOUR_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    spinner.stop("Config generated!");
    const formattedOutput = formatOutput(result.response.text());
    console.log(formattedOutput);
  } catch (error) {
    spinner.stop("Failed to generate config.");
    console.log(error);
  }
}

async function main() {
  p.intro(`setup-neovim`);
  const group = await p.group(
    {
      plugin: () =>
        p.multiselect({
          message: `Select plugins.`,
          options: [
            {
              value: "cmp-nvim-lsp",
              label: "Cmp",
              hint: "recommended",
            },
            {
              value: "prettier",
              label: "Prettier (an opinionated code formatter)",
            },
            {
              value: "Comment",
              label:
                "Comment (a Lua plugin that supports single-line and block comments)",
            },
            {
              value: "LuaSnip",
              label: "LuaSnip (snippets for various filetypes and languages)",
            },
            {
              value: "mason",
              label:
                "Mason (manage external editor tooling such as LSP servers, DAP)",
            },
            {
              value: "friendly-snippets",
              label:
                "Friendly Snippets (Snippets collection for a set of different programming languages.)",
            },
            {
              value: "nvim-tree",
              label:
                "Nvim Tree (a plugin that provides a file explorer for Neovim)",
            },
            {
              value: "nvim-ts-autotag",
              label:
                "Nvim Autotag (Automatically add closing tags for HTML and JSX)",
            },
            {
              value: "gitsigns",
              label:
                "Git Signs (highlights text that has changed since the list git commit)",
            },
            {
              value: "which-key",
              label:
                "Which Key (helps you remember key bindings by showing a popup)",
            },
            {
              value: "conform",
              label: "Conform (a lightweight and powerful formatter)",
            },
            {
              value: "vim-fugitive",
              label:
                "Vim Fugitive (allows you to invoke and act with git commands from within vim)",
            },
            {
              value: "trouble",
              label: "Trouble (better diagnostics list and others)",
            },
            {
              value: "eslint",
              label: "ESLint (a static code analysis tool)",
            },
            {
              value: "lualine",
              label: "Lualine (a beautiful statusline)",
            },
          ],
        }),
      treesitter: () =>
        p.confirm({
          message: "Treesitter (faster and more accurate syntax highlighting)",
        }),
      ts_servers: ({ results }) =>
        results.treesitter
          ? p.multiselect({
              message: "Pick TS Servers",
              options: [
                { value: "lua", label: "Lua", hint: "recommended" },
                { value: "html", label: "Html" },
                { value: "css", label: "Css" },
                { value: "javascript", label: "Javascript" },
                { value: "typescript", label: "Typescript" },
                { value: "c", label: "C" },
                { value: "rust", label: "Rust" },
                { value: "python", label: "Python" },
                { value: "ruby", label: "Ruby" },
                { value: "c++", label: "C++" },
                { value: "svelte", label: "Svelte" },
              ],
            })
          : undefined,
      colorschema: () =>
        p.confirm({
          message: "ColorSchema",
        }),

      themes: ({ results }) =>
        results.colorschema
          ? p.multiselect({
              message: "Pick your favorite color",
              options: [
                { value: "catppuccin", label: "Catppuccin" },
                { value: "tokyo-night", label: "Tokyo Night" },
                { value: "gruvbox", label: "Gruvbox" },
                { value: "nord", label: "Nord" },
                { value: "monokai", label: "Monokai" },
              ],
            })
          : undefined,
    },

    {
      onCancel: () => {
        p.cancel("Operation cancelled.");
        process.exit(0);
      },
    }
  );

  await sendRequest(
    `You are a master at crafting Neovim configurations. 
      Create a Neovim setup from scratch using the following requirements:
      - Folder structure:
        1. init.lua (only require files like config.lazy and config.keymap)
        2. lua/config/ (directory for configuration files)
           - keymap.lua (key mappings)
           - lazy.lua (Bootstrap lazy.nvim and Setup lazy.nvim)
        3. plugin/init.lua (return all of the plugins)
      - Use Lazy.nvim as the plugin manager. Plugins: ${group.plugin}; ${
      group.treesitter ? `Treesitter servers: ${group.ts_servers}` : ""
    }; ${group.colorschema ? `Colorschema: ${group.themes}` : ""} 
        - Do not reference or rely on any previous context or history. Generate a fresh configuration.
      - Format the output in Markdown-like styling for better readability.
    `
  );

  p.outro(`You're all set!`);
}

main();
