var H5PDialog = {
    /**
     * Do preliminary initialization of H5P Dialog
     *
     * @method preInit
     */
    preInit: function () {
        tinyMCEPopup.requireLangPack();
    },

    /**
     * Do initialization of H5P Dialog
     *
     * @method init
     */
    init: function (ed) {
        var f = document.forms[0], nl = f.elements, n = ed.selection.getNode();

        tinyMCEPopup.resizeToInnerSize();
        // Setup browse button.
        document.getElementById('srcbrowsercontainer').innerHTML =
            getH5PBrowserHTML('srcbrowser', 'h5pfile', 'h5p');
        document.getElementById('h5pfile').style.width = '500px';

        // File URL without parameters.
        var fileURL;

        // Make sure the selected element is H5P content if it needs to be edited.
        if (n.nodeName == 'DIV' && n.className == 'h5p-placeholder') {
            var fileBaseUrl = cfgWwwroot + '/draftfile.php';
            var H5PURL = n.innerHTML;
            if (fileBaseUrl == H5PURL.substring(0, fileBaseUrl.length)) {
                fileURL = H5PURL.split("?")[0];
                if (fileURL[fileURL.length - 1] == '?'){
                    fileURL = fileURL.slice(0, -1);
                }

                var parameters = H5PURL.split("?")[1];
                if (parameters) {
                    if (parameters.match(/export=1/)) {
                        nl.h5p_allow_download.checked = true;
                    }

                    if (parameters.match(/embed=1/)) {
                        nl.h5p_embed.checked = true;
                    }

                    if (parameters.match(/copyright=1/)) {
                        nl.h5p_copyright.checked = true;
                    }
                }
            }
            nl.h5pfile.value = fileURL;
        }
    },

    /**
     * Do URL validation
     *
     * @method _validURL
     */
    _validURL: function(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // Protocol.
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // Domain name.
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address.
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'); // Port and path.
        return !!pattern.test(str);
    },

    /**
     * Display or hide the waring inside the H5P dialog window
     *
     * @method displayWarning
     *
     * @param {string} selector - CSS selector to which the value should apply
     * @param {string} val - the visibility value ('none' or 'block')
     */
    displayWarning: function (selector, val) {
        var elems = document.querySelectorAll(selector), i;
        for (i = 0; i < elems.length; ++i) {
            elems[i].style.display = val;
        }
    },

    /**
     * Perform the validation check and insert H5P block into the editor
     *
     * @method insert
     *
     * @param {string} file - the H5P package file URL
     * @param {string} title - not used
     */
    insert: function (file, title) {
        var t = this, f = document.forms[0];

        // Hide all warnings.
        displayWarning('.alert-warning', 'none');

        if (f.h5pfile.value === '') {
            // Show content warning.
            displayWarning("." + CONTENTWARNING, 'block');
            return;
        }

        if (!f.h5pfile.value.startsWith(cfgWwwroot) && !this._validURL(f.h5pfile.value)) {
            // Show content warning.
            t.displayWarning("." + URLWARNING, 'block');
            return;
        }

        t.insertAndClose();
    },

    /**
     * Insert the H5P block into the editor and close the plugin Dialog
     *
     * @method insertAndClose
     */
    insertAndClose: function () {
        var ed = tinyMCEPopup.editor, f = document.forms[0], nl = f.elements, args = {}, el;

        tinyMCEPopup.restoreSelection();

        // Fixes crash in Safari.
        if (tinymce.isWebKit) {
            ed.getWin().focus();
        }

        tinymce.extend(args, {
            contenteditable: false,
            class: 'h5p-placeholder'
        });

        el = ed.selection.getNode();
        var opts_str = '';
        if (nl.h5p_allow_download.checked) {
            opts_str += '?export=1';
        }

        if (nl.h5p_embed.checked) {
            opts_str += (opts_str.length ? '&amp;' : '?') + 'embed=1';
        }

        if (nl.h5p_copyright.checked) {
            opts_str += (opts_str.length ? '&amp;' : '?') + 'copyright=1';
        }

        if (el && el.nodeName == 'DIV' && el.className == 'h5p-placeholder') {
            ed.dom.setAttribs(el, args);
            ed.dom.setHTML(el, nl.h5pfile.value + opts_str);
        } else {
            tinymce.each(args, function (value, name) {
                if (value === "") {
                    delete args[name];
                }
            });

            H5P_HTML = (addParagraphs ? '<p><br /></p>' : '') +
                '<div class="h5p-placeholder" contenteditable="false">' +
                 nl.h5pfile.value + opts_str +
                '</div>' +
                (addParagraphs ? '<p><br /></p>' : '');

            ed.execCommand('mceInsertContent', false, H5P_HTML, {skip_undo: 1});
            ed.undoManager.add();
        }

        tinyMCEPopup.editor.execCommand('mceRepaint');
        tinyMCEPopup.editor.focus();
        tinyMCEPopup.close();
    }
};
H5PDialog.preInit();
tinyMCEPopup.onInit.add(H5PDialog.init, H5PDialog);
