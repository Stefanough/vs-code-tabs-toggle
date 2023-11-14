# tabs-toggle README

Simple extension that provides a custom command to toggle the editor tabs-bar.

## Features

Very simple plugin that allows for toggling of the editor tabs-bar using a
custom command.

The release of VS Code 1.84 introduced a [new set of options for displaying the
editor tabs-bar](https://code.visualstudio.com/updates/v1_84#_hide-editor-tabs).
Unfortunately, there is no native command to toggle their hidden state. This
extension provides a new command `tabs-toggle.toggleTabs` to switch between the
hidden state and the "multiple" tabs state.

Bind this command to a keyboard shortcut to win back a few more pixels of
vertical space when needed.

## Known Issues

For now, toggling the tabs-bar also affects the visibility of the editor
breadcrumbs.

## Release Notes

### 0.0.1

Init