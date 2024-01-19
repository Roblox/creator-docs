---
title: OAuth 2.0 Sample App
description: Provides a working OAuth 2.0 sample application.
---

Roblox provides a Node.js sample app that shows how to use OAuth 2.0 to let users log in to their Roblox accounts. This app uses the [authorization code flow _without_ PKCE](oauth2-overview.md#grant-types) and is thus only suitable for confidential clients, such as private servers.

<a href="../../assets/open-cloud/open-cloud-nodejs-sample-oauth2-main.zip">
  <Button variant="contained">Get the Code</Button>
</a>

<br />

After downloading the `.zip` file, extract it to its own folder.

## Registering the App

The first step to setting up the app is to [register it on the Roblox website](oauth2-registration.md) and copy the client ID and secret somewhere safe. Then follow the standard registration steps with these settings:

1. Under **Permissions**, add the `openid` and `profile` scopes.
1. Under **Redirect URLs**, add the `http://localhost:3000/oauth/callback` redirect. If you want to use a non-default port for your app, specify it here.

## Setting Environment Variables

Rather than storing them in code (not recommended), the app uses environment variables for your client ID and secret. The process for adding environment variables differs by operating system.

On Windows, run the following PowerShell commands:

```powershell
$env:ROBLOX_CLIENT_ID='your_client_id_here'
$env:ROBLOX_CLIENT_SECRET='your_client_secret_here'
$env:ROBLOX_PORT=3000 # Optional. Default is 3000.
```

On Mac and most Linux distributions, run these commands at the terminal:

```bash
export ROBLOX_CLIENT_ID=your_client_id_here
export ROBLOX_CLIENT_SECRET=your_client_secret_here
export ROBLOX_PORT=3000 # Optional. Default is 3000.
```

If you specified a non-default port in the redirect URL when registering your app, be sure to add the `ROBLOX_PORT` variable.

<Alert severity="info">
These commands only set environment variables for the duration of your terminal session. If you want to load these variables every time you open a new terminal window, add the commands to your shell configuration file, such as `.zshrc` or `.bashrc`. Many hosting services have features to help you add environment variables to your servers.
</Alert>

## Installing Dependencies

The app has a handful of dependencies, visible in `package.json`. To install them, run:

```bash
npm ci
```

## Running the App

To start the app, run:

```bash
npm start
```

Then navigate to `http://localhost:3000` (or your non-default port) in a web browser.

The app immediately redirects you to the Roblox login screen, at which point you can log in, verify the permissions that the app is requesting, and click **CONFIRM AND GIVE ACCESS**.

Roblox then redirects you back to `localhost`, where you can see that the app now displays some minimal user information and a link back to your profile on Roblox.

### About the App

In broad strokes, `index.js` performs the following operations:

1. Starts a new web server using `express`.
1. Retrieves the Roblox OpenID Connect (OIDC) configuration, which includes endpoints for authorization, user information, etc. For more information about these endpoints, see [OAuth 2.0 Authentication](../reference/oauth2.md).
1. Creates a new Open ID client using `openid-client` and your stored credentials. This client dramatically simplifies the process of properly forming and sending HTTP requests to the OAuth 2.0 endpoints.
1. Defines the routes for the app, including redirects for the login and logout flows and the OAuth 2.0 callback.
1. After a successful login, stores the various tokens as cookies, along with some minimal user information that it displays as HTML with help from `getHomeHtml.js`.
