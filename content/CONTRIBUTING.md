# Contributing

This page provides more detailed instructions on the offline contribution process. Due to the size of this repository, we highly recommend using the online options outlined in [README.md](README.md).

## Setting up Git

The first step to contributing is to install Git. GitHub has thorough documentation for setting up [Git](https://docs.github.com/en/get-started/quickstart/set-up-git) and [Git LFS](https://docs.github.com/en/repositories/working-with-files/managing-large-files/installing-git-large-file-storage). On macOS, we recommend using [Homebrew](https://brew.sh/).

If you are new to Git, see [Git Guides](https://github.com/git-guides/) for explanations and tutorials. For a quick refresher on Git commands, see the [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf).

If you want to avoid the command line, a Git client like [GitHub Desktop](https://desktop.github.com) can perform all the operations on this page---cloning, branching, displaying diffs, and committing---but use whichever tool you prefer.

## Forking and Cloning

Instead of just cloning this repository, [fork it](https://docs.github.com/en/get-started/quickstart/fork-a-repo#forking-a-repository) on GitHub. Then [clone your fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo#cloning-your-forked-repository):

```shell
git clone https://github.com/your-username/your-fork.git
```

For instructions on keeping your fork in sync with `Roblox/creator-docs` over time, see [Syncing a fork](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/syncing-a-fork).

## Creating a New Branch

After you clone your fork, create a new branch with a unique name. Creating branches keeps your work organized and discrete and helps avoid merge conflicts when you sync your fork with `Roblox/creator-docs`.

Because you eventually want to merge into the `main` branch, use it as the basis for your new branch.

1. First, navigate to the repository root:

   ```shell
   cd creator-docs
   ```

1. Then switch to the `main` branch (if you're not already on it):

   ```shell
   git checkout main
   ```

1. Finally, create your new branch:

   ```shell
   git checkout -b your-new-branch
   ```

## Opening Pull Requests

When you're happy with your changes, commit them to your branch. Include a short summary and longer description:

```shell
git commit -m "summary" -m "description"
```

```shell
git push origin your-branch
```

Then open [`Roblox/creator-docs`](https://github.com/Roblox/creator-docs/pulls) on GitHub and click **New Pull Request**. Choose **main** as the _base_ branch and your branch as the _compare_ branch.

Add a title and description of your changes, confirm that the contribution is your own, original work that you have the right to submit, and create the pull request.
