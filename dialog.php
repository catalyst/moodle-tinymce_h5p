<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Dialog for TinyMCE h5p plugin
 *
 * @package    tinymce_h5p
 * @author  2021 Kateryna Degtyariova <katerynadegtyariova@catalyst-au.net>
 * @copyright  2021 Catalyst IT
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('NO_MOODLE_COOKIES', true); // Session not used here.
require(__DIR__ . '/../../../../../config.php');

$PAGE->set_context(context_system::instance());
$PAGE->set_url('/lib/editor/tinymce/plugins/h5p/tinymce/dialog.php');
$editor = get_texteditor('tinymce');

// Define data for the template rendering inside
// templates/template_data.mustache file.
$mydata = array(
     'getTinymceBaseUrl' => $editor->get_tinymce_base_url()->out(),
     'htmllang' => get_html_lang(),
     'elementid' => 'id_element',
     'canUploadAndEmbed' => '1',
     'canUpload' => '1',
     'canEmbed' => '1',
     'component' => 'tinymce_h5p',
     'cfgWwwroot' => $CFG->wwwroot,
     'addParagraphs' => '1',
     'CSS' => array(
         'CONTENTWARNING' => 'tinymce_h5p_contentwarning',
         'URLWARNING' => 'tinymce_h5p_warning',
         'H5PBROWSER' => 'openh5pbrowser'
     )
);
// Render the template and put it right in the body.
echo $OUTPUT->render_from_template('tinymce_h5p/template_data', $mydata);
