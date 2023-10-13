---
title: OAuth 2.0 App Registration
description: Explains how to register an app and how the review workflow works.
---

Registering your OAuth 2.0 app allows it to access Roblox resources. After
registration, Roblox assigns the app a unique client ID and secret that you can
use to obtain authorization from users to access their Roblox information and
resources.

<Alert severity="info">
You can only register apps for individual accounts or groups that you own.
</Alert>

## Registering Your App

To register an app:

1. In the Creator Dashboard, go to the
   [Credentials](https://create.roblox.com/credentials) page, click the **OAUTH 2.0
   APPS** tab, and click **CREATE APP**.
1. Enter a valid and globally unique **Application Name**.
1. Read and agree to the **Roblox Terms of Service** and click **CREATE**. The
   confirmation screen appears and provides you with your **Client ID** and
   **Secret**.
1. Copy and store the **Client ID** and **Secret** in a secure place. After
   closing the page, you no longer have access to the secret and can only
   generate a new one. After you finish registering an app, you can still access
   and edit the app's other properties.
1. Click **CONTINUE TO EDIT** to configure your app, which is described in the
   following sections.

## Configuring General Information

Configure the general information of your app, which includes:

- A description, which is visible to everyone in the Roblox community.
- A thumbnail image for your app. The recommended file size is at least 150x150
  pixels.
- An **Entry Link** as the entry point of your app, such as the app's website
  homepage.
- A **Privacy Terms URL** and a **Terms of Service URL** for end-users to read
  before authorizing your app. Each URL must be HTTPS and no more than 256
  characters.

<Alert severity="info">
  You can skip this section during app development and testing, but you must
  complete it during the review process to publish your app to users.
</Alert>

## Adding Permissions

To ensure proper access control and security within your app, you must add
**Permission Scopes**. There are two types of permission scopes available:

- **Identity scopes** for authentication, such as `openid` for user IDs and
  `profile` for the full profiles. If you select the `profile` scope, you must
  also select `openid`.
- **API-specific permission scopes**, such as `asset:read` for the read
  permission of assets. Select only the minimum number of scopes that you need
  for your app.

## Adding Redirect URLs

**Redirect URLs** are the reentry points of your app that users are redirected
to when they finish authorizing your app. Ensure your
redirect URLs meet the following requirements:

- All redirect URLs must be in one of the following forms:
  - Plain HTTPS, for example: `https://www.example.com`.
  - Paths on localhost with HTTP or HTTPS (self-signed certificate) for local
    debugging purposes, for example:
    - `http://localhost:80`
    - `https://localhost:80`
  - Custom schemes for specific applications or purposes, for example:
    - `my-app-scheme:/`
    - `my-app-scheme://foo/bar/...`
    - `my-app://action?param1=value1&param2=value2`
- The maximum length of a redirect URL is 256 characters.
- You can add up to 10 redirect URLs. With multiple redirect URLs, you can have
  test environments and allow users to migrate between two sites without
  downtime.

<Alert severity="info">
  You can skip this step during app registration and add the redirect URLs later
  when you have a testable version of your app.
</Alert>

## Submitting for Review

To minimize the chances of malicious apps harming the community, registering an
app doesn't make it publicly accessible. Instead, it remains in **private mode**
with a limit of 100 authorized users. This mode is helpful for testing and
debugging within your team.

If you want to extend the user base for your app, you need to publish it in
public mode by submitting it for review:

1. Go to the [Credentials](https://create.roblox.com/credentials) page in
   Creator Dashboard and click on the **OAUTH 2.0 APPS** tab.
1. Click the **EDIT AND PUBLISH** button for the app that you want to publish.
1. Fill in all the required information and click the **REVIEW AND PUBLISH**
   button. A message with limits on your app permissions during the pending
   review period appears.
1. Click **SUBMIT FOR REVIEW**.

While your app review is pending, you can't edit or submit another request until
the current review request is approved or rejected. Your app remains in
private mode during the review. When your app is approved, it transitions to
public mode, and you can't revert it back to private mode.

Regardless of whether your app is approved or rejected, you receive an email
notification of the result when the review is completed.

## Editing and Deleting Your App

You can edit or delete your app with the following steps if it's not under
review:

1. Go to the [Credentials](https://create.roblox.com/credentials) page on the
   **Creator Dashboard** and click the **OAUTH 2.0 APPS** tab.
1. Click **EDIT** or **DELETE** for the desired app.

   - If you chose to edit an app, follow the same steps and requirements of
     [registration](#registering-your-app).
   - If you chose to delete an app, click **YES, DELETE** to confirm deletion.
     After you delete an app, you can't recover it.

Modifying your app's general information or redirect URLs does not require users
to reauthorize the app. However, if you add or modify permission scopes, you
must obtain authorization for the new permissions from your users and acquire a
new set of tokens. If you don't obtain authorization for the new scopes, your
app can continue using the existing tokens, but is limited to the previous
scopes.

For apps in private mode, the system automatically updates your edits with your
users. For apps in public mode, you must
[submit the app for review](#submitting-for-review) again to reflect these changes.
Otherwise, the system saves the unpublished changes for you without releasing it
to the community.

<Alert severity ='info'> You can clone a copy of your public app and keep it in
private mode for iterative testing and debugging. This allows for a controlled
environment where you can safely make changes and resolve any issues before
submitting the app for review. </Alert>
