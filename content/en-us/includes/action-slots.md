---
title: include
---

Several action slot input bindings are predefined by Roblox and, in the future, the [Input Action Manager](../input/input-action-system.md#input-action-manager) will allow you to reconfigure default input bindings for action slots as desired. Setting `ActionSlot` to `0` will choose the next available empty slot. On mobile devices, slots `1`-`7` populate to buttons on the screen (see diagram below).

<table size="small">
<thead>
  <tr>
    <th>Slot</th>
    <th>Keyboard & Mouse</th>
    <th>Gamepad</th>
    <th>Touch</th>
    <th>Default Assignment</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>`1`</td>
    <td>`Enum.KeyCode.Space|Space`</td>
    <td>`Enum.KeyCode.ButtonA|ButtonA`</td>
    <td>①</td>
    <td>Jump</td>
  </tr>
  <tr>
    <td>`2`</td>
    <td>`Enum.KeyCode.LeftShift|LeftShift`</td>
    <td>`Enum.KeyCode.ButtonL1|ButtonL1`</td>
    <td>②</td>
    <td>Sprint</td>
  </tr>
  <tr>
    <td>`3`</td>
    <td>`Enum.KeyCode.LeftControl|LeftControl`</td>
    <td>`Enum.KeyCode.ButtonB|ButtonB`</td>
    <td>③</td>
    <td>Crouch</td>
  </tr>
  <tr>
    <td>`4`</td>
    <td>`Enum.KeyCode.R|R`</td>
    <td>`Enum.KeyCode.ButtonX|ButtonX`</td>
    <td>④</td>
    <td></td>
  </tr>
  <tr>
    <td>`5`</td>
    <td>`Enum.KeyCode.MouseLeftButton|MouseLeftButton`</td>
    <td>`Enum.KeyCode.ButtonR2|ButtonR2`</td>
    <td>⑤</td>
    <td></td>
  </tr>
  <tr>
    <td>`6`</td>
    <td>`Enum.KeyCode.Q|Q`</td>
    <td>`Enum.KeyCode.ButtonY|ButtonY`</td>
    <td>⑥</td>
    <td></td>
  </tr>
  <tr>
    <td>`7`</td>
    <td>`Enum.KeyCode.X|X`</td>
    <td>`Enum.KeyCode.ButtonR1|ButtonR1`</td>
    <td>⑦</td>
    <td></td>
  </tr>
  <tr>
    <td>`8`</td>
    <td>`Enum.KeyCode.C|C`</td>
    <td>`Enum.KeyCode.ButtonL2|ButtonL2`</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>`9`</td>
    <td>`Enum.KeyCode.F|F`</td>
    <td>`Enum.KeyCode.DPadLeft|DPadLeft`</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>`10`</td>
    <td>`Enum.KeyCode.G|G`</td>
    <td>`Enum.KeyCode.DPadRight|DPadRight`</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>`11`</td>
    <td>`Enum.KeyCode.V|V`</td>
    <td>`Enum.KeyCode.DPadDown|DPadDown`</td>
    <td></td>
    <td></td>
  </tr>
</tbody>
</table>

<img src="../assets/scripting/input/Action-Slots-Diagram.png" width="840" />
