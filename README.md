
hjjggghejrzrhf
ghghgghghgjghghghghghgjghghgjghghggjghhgghgj
**Note**: Currently, the repository has guides, tutorials, educational content, and the Engine API reference. Code samples are coming soon.

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
