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
                    width : 520 + ed.getLang('example.delta_width', 0),
                    height : 250 + ed.getLang('example.delta_height', 0),
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
                if (n.nodeName == 'DIV' && n.className == 'h5p-placeholder')
                    openH5PDialog();
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