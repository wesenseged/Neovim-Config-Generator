# Neovim Config Generator

This project is a simple terminal prompt that asks the user a couple of questions like which plugins to install, Treesitter servers, and color schemes. Based on the user's input, it generates a full configuration file.

![Demo Video](https://github.com/wesenseged/nvim/blob/assets/.assets/untitled.mp4)

## Dependencies

This project uses the following dependencies:

- [@clack/prompts](https://www.npmjs.com/package/@clack/prompts) ^0.9.1
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) ^0.24.0
- [@types/node](https://www.npmjs.com/package/@types/node) ^22.10.7
- [chalk](https://www.npmjs.com/package/chalk) ^5.4.1
- [dotenv](https://www.npmjs.com/package/dotenv) ^16.4.7

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/wesenseged/Neovim-Config-Generator
    ```
2. Install dependencies:
    ```bash
    bun install
    ```
3. Create a `.env` file in the root of the project and add your API key:
    ```dotenv
    YOUR_API_KEY=<your-api-key-here>
    ```

## Usage

To start the project, you can run the following command:
```bash
bun run start
```

Alternatively, you can directly run:
```bash
bun index.js
```

## Plugins

| Value                | Label                                                                                                | Hint          |
|----------------------|------------------------------------------------------------------------------------------------------|---------------|
| cmp-nvim-lsp         | Cmp                                                                                                  | recommended   |
| prettier             | Prettier (an opinionated code formatter)                                                             |               |
| Comment              | Comment (a Lua plugin that supports single-line and block comments)                                  |               |
| LuaSnip              | LuaSnip (snippets for various filetypes and languages)                                               |               |
| mason                | Mason (manage external editor tooling such as LSP servers, DAP)                                      |               |
| friendly-snippets    | Friendly Snippets (Snippets collection for a set of different programming languages.)                |               |
| nvim-tree            | Nvim Tree (a plugin that provides a file explorer for Neovim)                                        |               |
| nvim-ts-autotag      | Nvim Autotag (Automatically add closing tags for HTML and JSX)                                       |               |
| gitsigns             | Git Signs (highlights text that has changed since the list git commit)                               |               |
| which-key            | Which Key (helps you remember key bindings by showing a popup)                                       |               |
| conform              | Conform (a lightweight and powerful formatter)                                                       |               |
| vim-fugitive         | Vim Fugitive (allows you to invoke and act with git commands from within vim)                        |               |
| trouble              | Trouble (better diagnostics list and others)                                                         |               |
| eslint               | ESLint (a static code analysis tool)                                                                 |               |
| lualine              | Lualine (a beautiful statusline)                                                                     |               |

## Treesitter Servers

| Value                | Label                                                                                                | Hint          |
|----------------------|------------------------------------------------------------------------------------------------------|---------------|
| lua                  | Lua                                                                                                  | recommended   |
| html                 | Html                                                                                                 |               |
| css                  | Css                                                                                                  |               |
| javascript           | Javascript                                                                                           |               |
| typescript           | Typescript                                                                                           |               |
| c                    | C                                                                                                    |               |
| rust                 | Rust                                                                                                 |               |
| python               | Python                                                                                               |               |
| ruby                 | Ruby                                                                                                 |               |
| c++                  | C++                                                                                                  |               |
| svelte               | Svelte                                                                                               |               |

## Color Schemes

| Value                | Label                                                                                                |
|----------------------|------------------------------------------------------------------------------------------------------|
| catppuccin           | Catppuccin                                                                                           |
| tokyo-night          | Tokyo Night                                                                                          |
| gruvbox              | Gruvbox                                                                                              |
| nord                 | Nord                                                                                                 |
| monokai              | Monokai                                                                                              |

## Note
To get Treesitter server and color scheme options, you need to answer 'Yes' when prompted if you want to include those options.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.
