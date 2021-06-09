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

defined('MOODLE_INTERNAL') || die();

/**
 * TinyMCE text editor integration version file.
 *
 * @package    tinymce_h5p
 * @author  2021 Kateryna Degtyariova <katerynadegtyariova@catalyst-au.net>
 * @copyright  2021 Catalyst IT
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class tinymce_h5p extends editor_tinymce_plugin {
    /** @var array list of buttons defined by this plugin */
    protected $buttons = array('tinymce_h5p');

    /**
     * Implements the required abstract update_init_params() method
     * from editor_tinymce_plugin.
     *
     * Adds H5P button at the end of the last row of buttons
     * and registers the plugin JS module.
     *
     * @param array $params TinyMCE init parameters array
     * @param context $context Context where editor is being shown
     * @param array $options Options for this editor
     */
    protected function update_init_params(array &$params, context $context,
                                          array $options = null) {
        // Add button at the end
        $this->add_button_after($params, $this->count_button_rows($params),
            'tinymce_h5p');

        // Add JS file, which uses default name.
        $this->add_js_plugin($params);
    }
}
