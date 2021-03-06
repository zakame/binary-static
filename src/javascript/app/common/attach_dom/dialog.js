const showPopup        = require('./popup');
const elementInnerHtml = require('../../../_common/common_functions').elementInnerHtml;
const urlFor           = require('../../../_common/url').urlFor;

// use this function if you need a simple popup with just a confirm or also a cancel button
// if you need to show a form with some validations, use showPopup() instead
const Dialog = (() => {
    const baseDialog = (options, is_alert = false) => (
        new Promise((resolve) => {
            showPopup({
                url               : urlFor('dialog'),
                popup_id          : options.id,
                form_id           : '#frm_confirm',
                content_id        : '#dialog_content',
                additionalFunction: (container) => {
                    const el_dialog     = container;
                    const el_btn_ok     = container.querySelector('#btn_ok');
                    const el_btn_cancel = container.querySelector('#btn_cancel');
                    const el_title      = container.querySelector('#dialog_title');

                    if (!el_dialog) return;

                    const localized_message = Array.isArray(options.localized_message) ? options.localized_message.join('<p />') : options.localized_message;
                    elementInnerHtml(container.querySelector('#dialog_message'), localized_message);

                    const localized_title = options.localized_title;
                    if (localized_title && el_title) {
                        el_title.setVisibility(1);
                        elementInnerHtml(container.querySelector('#dialog_title'), localized_title);
                    }

                    if (is_alert) {
                        el_btn_cancel.classList.add('invisible');
                    } else {
                        el_btn_cancel.addEventListener('click', () => {
                            el_dialog.remove();
                            if (typeof options.onAbort === 'function') {
                                options.onAbort();
                            }
                            resolve(false);
                        });
                    }

                    if (options.ok_text && el_btn_ok.firstElementChild) {
                        el_btn_ok.firstElementChild.textContent = options.ok_text;
                    }

                    if (options.cancel_text && el_btn_cancel.firstElementChild) {
                        el_btn_cancel.firstElementChild.textContent = options.cancel_text;
                    }

                    el_btn_ok.addEventListener('click', () => {
                        el_dialog.remove();
                        if (typeof options.onConfirm === 'function') {
                            options.onConfirm();
                        }
                        resolve(true);
                    });
                },
            });
        })
    );

    return {
        alert  : (options) => baseDialog(options, true),
        confirm: (options) => baseDialog(options),
    };
})();

module.exports = Dialog;
