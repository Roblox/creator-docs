---
title: MCP servers
description: Use both the built-in Studio MCP server and third-party MCP servers to give Assistant context from external tools.
---

Model Context Protocol (MCP) servers connect AI models to your local data, tools, and systems. They allow large language models (LLMs) to securely access files, databases, and APIs, providing additional context that helps generate more accurate and useful results.

With [Roblox's open source Studio MCP server](https://github.com/Roblox/studio-rust-mcp-server), you can access and edit your experience directly from external AI coding tools. These AI agents can plan, write, test, and modify your code and data with little intervention and effort on your part.

You can integrate and leverage models from the following LLMs into your workflow:

- [Anthropic](https://platform.claude.com/settings/keys)
- [OpenAI](https://platform.openai.com/api-keys)
- [Google Gemini](https://ai.google.dev/gemini-api/docs/api-key)

To connect and use an external LLM:

1. Get an API key from the LLM you want to use.
2. In Studio, open Assistant.
3. Click **&ctdot;**  &rang; **Manage API Keys**.
4. Select a provider and enter your API key.
5. In the **Model** drop-down, select the model you want to use.

<img src="./../assets/assistant/BYOK.png" alt="BYOK in Assistant Settings." width="550" />
