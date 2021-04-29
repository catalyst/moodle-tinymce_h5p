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
 * @copyright  2021 Kateryna Degtyariova <katerynadegtyariova@catalyst-au.net>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define('NO_MOODLE_COOKIES', true); // Session not used here.
require(__DIR__ . '/../../../../../config.php');
$PAGE->set_context(context_system::instance());
$PAGE->set_url('/lib/editor/tinymce/plugins/h5p/tinymce/dialog.php');
$stringmanager = get_string_manager();
$editor = get_texteditor('tinymce');
$plugin = $editor->get_plugin('h5p');
$htmllang = get_html_lang();
header('Content-Type: text/html; charset=utf-8');
header('X-UA-Compatible: IE=edge');

require_once($CFG->libdir.'/formslib.php');
require_once($CFG->libdir.'/moodlelib.php');
require_once($CFG->dirroot.'/lib/filelib.php');
require_once($CFG->dirroot.'/mod/hvp/mod_form.php');

?>
<!DOCTYPE html>
<html <?php echo $htmllang ?>
<head>
    <title>{#h5p.desc}</title>
    <script type="text/javascript" src="<?php echo $editor->get_tinymce_base_url(); ?>/tiny_mce_popup.js"></script>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
<?php
    /**
     *  Define data for the template rendering inside
     *  templates/template_data.mustache file.
     */
    $mydata = array(
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
?>
</body>
</html>