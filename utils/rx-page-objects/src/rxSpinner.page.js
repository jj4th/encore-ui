var Page = require('astrolabe').Page;

/**
 * @deprecated rxSpinner will be remove in rxPageObjects 4.0.0
 */
exports.rxSpinner = Page.create({
    rxSpinnerElement: {
        get: function () {
            console.warn (
                'DEPRECATED: rxSpinner will be remove in rxPageObjects 4.0.0'
            );
            return element(by.id('rxSpinnerElement'));
        }
    }
});
