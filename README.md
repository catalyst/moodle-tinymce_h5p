<a href="https://travis-ci.org/catalyst/moodle-tinymce_h5p">
<img src="https://travis-ci.org/catalyst/moodle-tinymce_h5p.svg?branch=main">
</a>

https://moodle.org/plugins/tinymce_h5p

H5P Plugin for TinyMCE Editor
=============================

* [What is this?](#what-is-this)
* [Prerequisites](#prerequisites)
* [Branches](#branches)
* [Installation](#installation)
* [Configuring](#configuring)
* [Usage](#usage)
* [Screenshot](#screenshot)
* [Support](#support)
* [License](#license)

## What is this?

This is a plugin which adds a new button in TinyMCE editor allowing to insert H5P content.
The functionality of this button is similar to the H5P button in Atto text editor.

## Prerequisites

* Moodle versoin 3.9+ with TinyMCE 3.5+
* PHP 7.2+

## Branches

`main` is considered stable and supports the following versions of Moodle:

| Moodle version        | Branch     |  PHP  |
|-----------------------|------------|-------|
| Moodle 3.9+           | main       | 7.2   |

## Installation
**Installing via Moodle plugin directory**

The plugin can be installed via Moodle plugin directory:
https://moodle.org/plugins/tinymce_h5p

**Installing via uploaded ZIP file**

1. Log in to your Moodle site as an admin and go to *Site administration > Plugins > Install plugins*.
1. Upload the ZIP file with the plugin code. You should only be prompted to add extra details if your plugin type is not automatically detected.
1. Check the plugin validation report and finish the installation.

**Installing via Git**

    cd {your/moodle/dirroot}/lib/editors/tinymce/plugins
    git clone git@github.com:catalyst/tinymce_h5p.git h5p
    
Afterwards, log in to your Moodle site as an admin and go to _Site administration >
Notifications_ to complete the installation.

Alternatively, you can run

    $ php admin/cli/upgrade.php

to complete the installation from the command line.

**Installing manually**

The plugin can be also installed by putting the plugin files into

    {your/moodle/dirroot}/lib/editors/tinymce/plugins/h5p

After files are placed in the correct directory the istallation can proceed in the same way as with **Installing via Git**

## Configuring

After the plugin is installed it should be visible in _Site administration > Plugins > Text editors > TinyMCE HTML editor > General settings_:

![tinymce_h5p plugin in the list of TinyMCE plugins](/pix/2021-06-08-plugin_001.png?raw=true)

By default the button is placed at the end of the lowest row of buttons in TinyMCE toolbar, which usually has more than one row. Therefore, in order to see the H5P button the _Toolbar Toggle_ must be clicked first in TinyMCE toolbar:

![tinymce_h5p button in TinyMCE toolbar](/pix/2021-06-08-plugin_002.png?raw=true)

It is possible to place TinyMCE at any position in any row. To do so you need to edit settings inside _Editor Toolbar_ text area, which can be accessed from _Site administration > Plugins > Text editors > TinyMCE HTML editor > General settings_ scrolling down to _Settings > Editor Toolbar_. Usually there are pre-filled lines corresponding to a default configuration. Each line of text is configuring a line of buttons in the editor toolbar. Placing the text value _tinymce_h5p_ inside the text controls the position of the button in the toolbar:

![tinymce_h5p button in TinyMCE toolbar](/pix/2021-06-08-plugin_003.png?raw=true)

## Usage

Clicking the button opens a small dialog allowing the user to add a new or edit an existing H5P block properties inside the editor depending on the current selection. Double-clicking on an existing H5P block inside the editor opens the dialog with properties automatically.

Clicking on "Browse Repositories" button in the dialog opens a file picker allowing to upload H5P packages or use embedded or recently uploaded H5P packages.

The plugin dialog has a few other options:

* **Allow download** checkbox will add the **Download** button to H5P content when it is displayed on the page to allow downloading the package by users.
* **Embed button** checkbox will add the **Embed** button to H5P content when it is displayed on the page and provide the embed code to be used by 3rd parties.
* **Copyright button* checkbox will add the **Copyright** button to H5P content when it is displayed on the page with the copyright information about H5P package.

## Screenshot

![tinymce_h5p button in TinyMCE toolbar](/pix/2021-06-08-plugin_004.png?raw=true)

## Support

If you have issues please log them in github here

https://github.com/catalyst/tinymce_h5p/issues

Please note our time is limited, so if you need urgent support or want to
sponsor a new feature then please contact Catalyst IT Australia:

https://www.catalyst-au.net/contact-us

This plugin was developed by Catalyst IT Australia:

https://www.catalyst-au.net/

<img alt="Catalyst IT" src="https://cdn.rawgit.com/CatalystIT-AU/moodle-auth_saml2/master/pix/catalyst-logo.svg" width="400">

## License

2021 Catalyst IT

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see https://www.gnu.org/licenses/.
