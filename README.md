# Roblox Creator Documentation

This repository holds source code for the creator documentation at [create.roblox.com/docs](https://create.roblox.com/docs).

**Note**: Currently, the repository has guides, tutorials, and educational content. Engine API reference files and code samples are coming soon.

If you're unfamiliar with the GitHub contribution process, see [About pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) and the following video.

<https://github.com/Roblox/creator-docs/assets/84365734/b5d10495-837a-454f-9d96-e01ed44e32c7>

## Reporting Issues

If you find a problem with the documentation and don't want to submit a pull request, please let us know by [reporting it on the Roblox developer forums](https://devforum.roblox.com/w/bug-report/).

## Contribution Guidelines

Any addition to the Roblox creator documentation has to fit within the larger whole. In other words, even a comprehensive, accurate, well-written blog post or technical whitepaper might not have a home on the website.

Generally speaking, we look for content that conforms to our existing standards and applies to a wide variety of experiences and use cases. For example, we prefer pages like **Building User Interfaces** to pages like **Creating a Speedometer for a Racing Game**. Consider posting more specialized guides to the [Roblox developer forum](https://devforum.roblox.com/c/resources/71).

When you submit a pull request for review, you must agree to the following:

- This contribution was created in whole or in part by me, and I have the right to submit it under the terms of this repository's open source licenses.
- I understand and agree that this contribution and a record of it are public, maintained indefinitely, and may be redistributed under the terms of this repository's open source licenses.
- To the best of my knowledge, all proposed changes are accurate.

## Minor Contributions

For simple changes that only touch a single file, use GitHub's web-based editor:

1. Find the file in `content/en-us/` and click **Edit this file**.
1. Click **Fork this repository**.
1. Make your changes and click **Commit changes...**.
1. Give your change a descriptive commit message and click **Propose changes**.
1. Ensure that the base repository is `Roblox/creator-docs` and the base branch is `main`. Verify that you're happy with your changes and click **Create pull request**.
1. Finally, fill out the details in the pull request description and click **Create pull request**.

## Larger Contributions

For larger changes that touch multiple files, we recommend github.dev, a more full-featured text editor based on Visual Studio Code that runs in your browser:

1. Fork the repository.
1. While browsing your fork, press the <kbd>.</kbd> key to open github.dev.
1. In the **Source Control** menu, click **...** > **Branch** > **Create Branch...**.
1. Give the branch a name and click **Switch to Branch**.
1. Use the **Explorer** menu to find the files you want to update in `content/en-us`, and make your desired changes.
1. In the **Source Control** menu, verify that you're happy with your changes.
1. Add a commit message and click **Commit & Push**.
1. In a new browser tab, navigate to [github.com/Roblox/creator-docs](https://github.com/Roblox/creator-docs).
1. Click **Compare & pull request**.
1. Verify that the base repository is `Roblox/creator-docs` and the base branch is `main`. The head repository should be your fork and your branch.
1. Finally, fill out the details in the pull request description and click **Create pull request**.

Alternatively, you can use the **GitHub** or **GitHub Pull Request** menus in github.dev to submit the pull request. For documentation on using github.dev, see [GitHub Codespaces](https://docs.github.com/en/codespaces/the-githubdev-web-based-editor).

## Offline Workflow

This repository is extremely large, so we recommend using the online options whenever possible. However, if you're already familiar with the general GitHub workflow and want to use an offline text editor, here are the basic steps for contributing to the documentation:

1. Set up [Git](https://docs.github.com/en/get-started/quickstart/set-up-git) and [Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage). Alternatively, install a Git client like [GitHub Desktop](https://desktop.github.com).
1. Fork this repository.
1. Clone your fork.
1. Navigate to the repository root.
1. Create a new branch.
1. Make your desired changes.
1. Commit, push to your fork, and submit your pull request against this repository's `main` branch.

For more detailed steps, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Document Types

The Roblox documentation has three main document types:

- Conceptual and task-based guides in `.md` files in [content/en-us/](./content/en-us/)

  Guides teach you about a feature or workflow without being overly prescriptive about the end result. They introduce concepts and features and cover the tasks you can accomplish using various tools or other approaches.

  Guides benefit massively from practical, real-world use cases, images, code snippets, and diagrams. Most task-based content should include a numbered list.

- API reference docs in `.yaml` files in [content/en-us/reference](./content/en-us/reference)

  APIs are entirely reference content and should use functional descriptions, linking to guides where appropriate. More than other content types, reference content should be terse and direct; summaries for properties, methods, events, and callbacks don't need to be full sentences.

- Tutorials in `.md` files in [content/en-us/tutorials](./content/en-us/tutorials)

  Compared to task-based guides, tutorials are more self-contained and take you from _nothing_ to _something_. This focus on creating something specific means they're typically much more prescriptive than guides. Tutorials often touch multiple features and concepts at the same time, demonstrating the connections between tools and strategies.

If your contribution doesn't fit within these categories or covers a particularly narrow subject, it might not be a good fit for the documentation. Consider posting it to the [Roblox developer forum](https://devforum.roblox.com/c/resources/71).

## Contribution Basics

Try to limit your edits to one class or feature so that the pull request is easier to review. Bug fixes and smaller improvements have a higher likelihood of fast approval. Large guides often require significant back-and-forth before publication.

To avoid formatting issues, we recommend text editors like github.dev that let you preview Markdown as you write it. For prose, try to follow the guidelines in [STYLE.md](STYLE.md). For code samples, use the [Lua Style Guide](https://roblox.github.io/lua-style-guide/).

To view a page fully formatted per what we see on the `main` branch, replace the entire URL from `content/` and before. Files with the basename `index` should have that name removed. For example, the page for "https://github.com/Roblox/creator-docs/blob/main/content/en-us/avatar/index.md" is rendered at "https://create.roblox.com/docs/en-us/avatar".

## Licenses

- For prose, this project uses the Creative Commons Attribution 4.0 International Public License. For full license text, see [LICENSE](LICENSE).
- Code samples are available under the MIT License. For full license text, see [LICENSE-CODE](LICENSE-CODE).

## Code of Conduct

To maintain an open, welcoming, diverse, inclusive, and healthy community, this project enforces an adapted version of the Contributor Covenant. For more information, see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
