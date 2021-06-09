(function() {

    // Load plugin specific language pack.
    tinymce.PluginManager.requireLangPack('h5p');

    tinymce.create('tinymce.plugins.H5P', {
        /**
         * Initializes the plugin, this will be executed after the plugin has been created.
         * This call is done before the editor instance has finished it's initialization so use the onInit event
         * of the editor instance to intercept that event.
         *
         * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
         * @param {string} url Absolute URL to where the plugin is located.
         */
        init : function(ed, url) {
             // Function to open H5P Dialog.
            var openH5PDialog = function () {
                ed.windowManager.open({
                    file : ed.getParam("moodle_plugin_base") + 'h5p/dialog.php',
                    width : 520,
                    height : 250,
                    inline : 1
                }, {
                    plugin_url : url
                });
            };

            // Register the dialog function as a command.
            ed.addCommand('mceH5P', openH5PDialog);

            // Register a button in TinyMCE dashboard.
            ed.addButton('tinymce_h5p', {
                title : 'H5P Plugin',
                cmd : 'mceH5P',
                image : url + '/img/tinymce_h5p.png'
            });

            // A hack to enable the styles inside TinyMCE.
            ed.contentCSS.push(ed.getParam("moodle_plugin_base") + '/h5p/tinymce_h5p.css');

            // Process double-click on H5P element inside the editor.
            ed.onDblClick.add(function(ed, e) {
                var n = ed.selection.getNode();
                if (n.nodeName == 'DIV' && n.className == 'h5p-placeholder') {
                    openH5PDialog();
                }
            });
        },
        /**
         * Returns information about the plugin as a name/value array.
         * The current keys are longname, author, authorurl, infourl and version.
         *
         * @return {Object} Name/value array containing information about the plugin.
         */
        getInfo : function() {
            return {
                longname : 'H5P plugin',
                author : 'Kateryna Degtyariova',
                authorurl : 'https://catalyst-au.net/',
                infourl : '',
                version : "1.0"
            };
        }
    });

    tinymce.PluginManager.add('h5p', tinymce.plugins.H5P);
})();

/**
 * Keep the original TinyMCE filepicker in a variable, so it could be called
 * when processing file types other than H5P
 */
var editor_tinymce_filepicker = M.editor_tinymce.filepicker;

/**
 * Opens the File Picker and applies the filter for H5P files.
 * Overrides the standard filepicker function.
 * In addition to the existing types 'media', 'file' and 'image
 * it introduces a new 'h5p' type.
 */
var h5p_tinymce_browser_callback = function(target_id, url, type, win) {
    if (type == 'h5p') {
        // When H5P button clicked it needs special handling
        YUI().use('core_filepicker', function (Y) {
            var editor_id = tinyMCE.selectedInstance.editorId;
            if (editor_id == 'mce_fullscreen') {
                editor_id = tinyMCE.selectedInstance.settings.elements;
            }
            var options = options = M.editor_tinymce.filepicker_options[editor_id]['h5p'];
            options.formcallback = M.editor_tinymce.filepicker_callback;
            options.editor_target = win.document.getElementById(target_id);
            M.core_filepicker.show(Y, options);
        });
    } else {
        // If not H5P type we should call the original plugin filepicker
        editor_tinymce_filepicker(target_id, url, type, win);
    }
};
