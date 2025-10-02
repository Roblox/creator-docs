---
title: Risk levels
description: Explains the risk level classifications for Open Cloud API endpoints and their behavior in the "try it out" feature.
---

Risk levels classify Open Cloud endpoints based on the potential impact of their operations. These classifications apply to the OAuth 2.0 authorization flow and the "try it out" feature here in the API documentation.

Risk levels help protect your data and account when testing API endpoints in the documentation. Always review an endpoint's functionality and potential impact before testing, particularly for medium and high risk operations that can modify your data.

## Try it out risk levels

The "try it out" feature uses four risk levels, which control the warnings and restrictions that you encounter when testing endpoints directly from the documentation.

<table>
  <thead>
    <tr>
      <th>Risk level</th>
      <th>"Try it out" allowed</th>
      <th>Warning dialog</th>
      <th>Warning banner</th>
      <th>Cookie attachment</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Low</td>
      <td>&#9989;</td>
      <td>No</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>Medium</td>
      <td>&#9989;</td>
      <td>Yes (per endpoint, per session)</td>
      <td>Yes</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td>High</td>
      <td>&#9989;</td>
      <td>Yes (per endpoint, per session)</td>
      <td>Yes</td>
      <td>Yes (after accepting second warning dialog)</td>
    </tr>
    <tr>
      <td>Critical</td>
      <td>&#10060;</td>
      <td>N/A</td>
      <td>N/A</td>
      <td>N/A</td>
    </tr>
  </tbody>
</table>

- **Low risk** endpoints primarily retrieve publicly available information and have minimal impact on your data or experiences. These endpoints show a simple informational banner when using "try it out."

- **Medium risk** endpoints can create, update, or access private information. Most changes you make from these endpoints can be reversed using other available endpoints. These endpoints have the following "try it out" safety measures:

  - They display a confirmation dialog before you send a request. This dialog appears once per endpoint per browser session.
  - They show a warning banner to remind you of the risk level.

- **High risk** endpoints can modify or delete private information in ways that may be difficult or impossible to reverse. This category includes most DELETE operations and other potentially destructive actions. In addition to the confirmation dialog and warning banner from medium risk endpoints, a second confirmation dialog is required to send the first request (enforced only per session, not per endpoint).

- **Critical risk** endpoints access or modify highly sensitive data that could compromise account security or privacy. "Try it out" is disabled for these endpoints.
