# UniChat AI

<img src="resources/icon.png" alt="UniChat AI Logo" />

UniChat AI is a cross-platform desktop application that provides a unified interface for interacting with multiple large language models (LLMs) through a single elegant chat interface. With built-in support for Model Context Protocol (MCP), UniChat AI extends the capabilities of AI models with tools, resources, and custom integrations.

## Features

- 🤖 **Multi-Model Support**: Chat with models from OpenAI, Anthropic, Google Gemini, and local models via Ollama
- 📂 **Project Management**: Organize conversations into projects with custom settings and instructions
- 🔌 **MCP Integration**: Connect to any Model Context Protocol server to extend AI capabilities
- 🔄 **Continuous Context**: Switch models mid-conversation while maintaining context
- 📎 **File Attachments**: Attach and reference files in your conversations
- 🔐 **Secure API Management**: Securely store your API keys in your system's credential store
- 🌓 **Light/Dark Modes**: Work comfortably day or night with theme support
- 💾 **Data Ownership**: All your conversations are stored locally

## Installation

### Download pre-built binaries

Download the latest release for your platform from the [Releases](https://github.com/fayazk/unichat-ai/releases) page.

| Platform | Download |
|----------|----------|
| Windows | [UniChat-AI-Windows.exe](https://github.com/fayazk/unichat-ai/releases) |
| macOS | [UniChat-AI-macOS.dmg](https://github.com/fayazk/unichat-ai/releases) |
| Linux | [UniChat-AI-Linux.AppImage](https://github.com/fayazk/unichat-ai/releases) |

### Build from source

```bash
# Clone the repository
git clone https://github.com/fayazk/unichat-ai.git
cd unichat-ai

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build
```

## Getting Started

1. **Launch the application** after installation
2. **Add your API keys** in the Settings panel
3. **Create your first project** by clicking the "+" button in the sidebar
4. **Start chatting** with your preferred AI model
5. **Configure MCP servers** (optional) to extend AI capabilities

## MCP Integration

UniChat AI supports Model Context Protocol (MCP) servers for extending AI capabilities with tools and resources. To configure MCP servers:

1. Navigate to Settings > MCP Servers
2. Add a new server configuration:

```json
{
  "name": "filesystem",
  "command": "npx",
  "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/directory"]
}
```

Learn more about available MCP servers in the [MCP documentation](https://modelcontextprotocol.io/examples).

## API Keys

UniChat AI requires API keys to access different LLM providers:

- **OpenAI**: [Get API key](https://platform.openai.com/api-keys)
- **Anthropic**: [Get API key](https://console.anthropic.com/settings/keys)
- **Google Gemini**: [Get API key](https://ai.google.dev/tutorials/setup)

API keys are securely stored in your system's credential store and never shared.

## For Developers

### Architecture

UniChat AI uses a modular architecture with these key components:

1. **UI Layer**: Electron with React/Vue components
2. **Provider Layer**: Adapters for different LLM APIs
3. **MCP Layer**: Integration with MCP servers
4. **Storage Layer**: Local database and file system interaction

### Adding New LLM Providers

To add support for a new LLM provider:

1. Create a new adapter in `src/api/providers/`
2. Implement the `ProviderInterface`
3. Register the provider in `src/api/providerRegistry.ts`

See the [Developer Guide](docs/DEVELOPMENT.md) for detailed instructions.

## Troubleshooting

### Common Issues

- **API Connection Issues**: Verify your API keys and internet connection
- **MCP Server Not Connecting**: Check your MCP server configuration and ensure the correct paths
- **Missing Messages**: If conversations disappear, check the application logs for database errors

For more help, see the [Troubleshooting Guide](docs/TROUBLESHOOTING.md) or open an issue.

## Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Electron](https://www.electronjs.org/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [OpenAI](https://openai.com/)
- [Anthropic](https://www.anthropic.com/)
- [Google Gemini](https://deepmind.google/technologies/gemini/)
- [Ollama](https://ollama.ai/)

---

Made with ❤️ by Fayaz K

[GitHub](https://github.com/fayazk) | [Website](https://fayazk.com)
