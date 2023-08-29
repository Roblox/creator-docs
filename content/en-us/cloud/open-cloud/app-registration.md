---
title: App Registration and Review (Beta)
description: Explains how to register an app and how the review workflow works.
---

Through the [OAuth 2.0 authorization framework](../../cloud/open-cloud/oauth2-overview.md), you can build and publish applications for other creators in the Roblox community to use. Once a creator authorizes your app to access their resources through the OAuth 2.0 authorization framework, depending on the scopes that they grant, your app can create, read, update, or delete the authorized resources, such as broadcasting messages across experience servers.

<Alert severity="warning">
Third-Party app support through OAuth 2.0 is a Beta feature that might be subject to changes for future releases.
</Alert>

## Registering an App

Before registering an app, you need to have a publicly accessible domain or web address where you can host your application. It's also recommended to plan your app's functionalities and begin development before proceeding with the registration process.

<Alert severity="info">
Currently, you can only register apps for your individual account instead of a group.
</Alert>

Once are ready, you can register your application on the [Credentials](https://create.roblox.com/credentials) page of **Creator Dashboard** by:

1. Select the **OAUTH APPS** section and click **CREATE APP**.
1. Input a valid and globally-unique **Application Name**.
1. Read the **Roblox Terms of Service** and select the checkbox if you agree to them.
1. Click **CREATE**. The dashboard then prompts a confirmation page for you with the **Client ID** and **Secret**

Copy and store the [Client ID and Secret](../../cloud/open-cloud/oauth2-overview.md#client-id) in a secure place. Once closing this page, you no longer have access to the secret, but can only regenerate a new one. Once you finish registering an app, you can still edit it or regenerate its secret with unlimited attempts.

### Configuring General Information

After storing the Client ID and Secret in a secure place, you can configure the general information of your application, which include:

- Add a description to your app, which is visible to everyone in the Roblox community.
- (Optional) Upload a thumbnail image for your app. The recommended file size is larger than 150x150 pixels.
- Add an **Entry Link** as the entry point of your app, such as the app's website homepage and the app store page.
  - Add a **Privacy Terms URL** and a **Terms of Service URL** for end-users to read before authorizing your app. Each URL must be HTTPS and no more than 256 characters.

### Adding Permission Scopes

To ensuring proper access control and security within your app, you need to add **Permission Scopes** intending to grant from creators. There are two types of permission scopes available:

- **Identity scopes** for authentication, such as `openid` for user IDs and `profile` for the full profiles.
- **API-specific permission scopes**, such as `asset:read` for the read permission of assets.

### Adding Redirect URLs

**Redirect URLs** are the re-entry points of your app that users are redirected to once they finish authorizing your app. They redirects users to appropriate locations that prevent them from exposing sensitive information. Make sure your redirect URLs meet the following requirements:

- All redirect URLs must be the following forms:
  - Plain HTTPS: `https://www.example.com`.
  - Paths on localhost with HTTP or HTTPS (self-signed certificate) for local debugging purposes: `http://localhost:80` and `https://localhost:80`.
  - Custom schemes for specific applications or purposes: `my-app-scheme:/`, `my-app-scheme://foo/bar/...`, `my-app://action?param1=value1&param2=value2`.
- The maximum length of a redirect URL is 256 characters.
- You can add up to 10 redirect URLs. With multiple redirect URLs, you can have test environments and support end-users to migrate between two sites without down-time.

<Alert severity="info">
If you haven't completed developing your app, you can skip this step and add the redirect URLs later by editing your app, but you can't publish your app to the public until you add at least one redirect URL.
</Alert>

Once a user completes the authorization process and is redirected back to the app:

- When the authorization is successful, your app can expect a `GET` request to the specified redirect URL with parameters `code` and `state`.

  - The `code` parameter contains an authorization code that the app can exchange for an access token from the authorization server.
  - The `state` parameter is an opaque value that the app initially provided in the authorization request and can be used to maintain the state or context of the authorization process.

- When the authorization fails, your app can expect the parameters `error`, `error_description`, and `state` in the GET request to the redirect URL.
  - The `error` parameter indicates the specific OAuth 2.0 error that occurred during the authorization process.
  - The `error_description` parameter provides additional details of the error.
  - The `state` parameter helps the app maintain the state even in the case of a failure.

## Submitting Your App for Review

To minimize the chances of malicious apps harming the community, registering an app doesn't automatically make it publicly accessible. Instead, it remains in **private mode** with a limit of 100 authorized users. This mode is helpful for testing and debugging within your team.
If you want to extend the user base for your app to the rest of the community, you need to publish it in **public mode** by submitting it for review through the following steps:

1. Go to the [Credentials](https://create.roblox.com/credentials) page on Creator Dashboard and navigate to the **OAUTH2 APPS** section.
2. Select the app that you want to publish.
3. Once checking all of your configuration fields are correct, click the **REVIEW AND PUBLISH** button.
4. The dashboard prompts you a window with limits on your app permissions during the pending review period. Click **SUBMIT FOR REVIEW** if you accept them. The system then prompts you an alert on whether your submission succeeds. If your submission fails, you can try again later.

When your app is in the pending review status, you can't edit it or submit another request for the same app until your existing review request is approved or rejected. Your app remains in private mode during the review. Once your app is approved, it transitions to public mode and can't be reverted back to private mode. Regardless of whether your app is approved or rejected, you will receive an email notification for the result once the review is completed.

## Editing and Deleting Your App

You can edit or delete your app with the following steps when it's not under review:

1. Go to the [Credentials](https://create.roblox.com/credentials) page on **Creator Dashboard** and navigate to the **OAUTH2 APPS** section.
1. Click **EDIT** or **DELETE** for the target app.

   - If you choose to edit an app, follow the same steps and requirements of [registration](#registering-an-app).
   - If you choose to delete an app, a confirmation window pops out. Click **YES, DELETE** to confirm deletion or **CANCEL** if you change your mind.

     <Alert severity ="warning">
     Once you delete an app, you can't recover it.
     </Alert>

Modifying your app's general information or redirect URLs does not require users to reauthorize the app. However, if you add or modify permission scopes, you need to obtain authorization for the new permissions from your users and acquire a new set of tokens. If you don't obtain authorization for the new scopes, your app can continue using the existing tokens but limited to the previous scopes.

For apps in private mode, the system automatically updates your edits with your users. For apps in public mode, you need to [submit the app for review](#submitting-your-app-for-review) again to reflect these changes, otherwise the system saves the unpublished changes for you without releasing it to the community.

<Alert severity ='info'>
You can clone a copy of your public app and keep it in private mode for iterative testing and debugging. This allows for a controlled environment where you can safely make changes and resolve any issues before submitting the app for review.
</Alert>
