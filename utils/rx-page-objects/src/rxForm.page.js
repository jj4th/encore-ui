'use strict';
const _ = require("lodash");
let rxFieldName = require('./rxFieldName.page').rxFieldName;
/**
 * @description
 * Generates a getter and a setter for a text field on your page.
 * Text fields include text boxes, text areas, anything that responds to `.clear()` and `.sendKeys()`.
 * @example
 * class YourPage {
 *     @textFieldAccessor(element(by.model('username'))) plainTextbox;
 * });
 *
 * it('should fill out the text box', function () {
 *     yourPage.plainTextbox = 'My Username'; // setter
 *     expect(yourPage.plainTextbox).to.eventually.equal('My Username'); // getter
 * });
 */
function textFieldAccessor(elem) {
    return function (target, propertyKey) {
        return {
            get: function () {
                return elem.getAttribute('value');
            },
            set: function (input) {
                elem.clear();
                elem.sendKeys(input);
            }
        };
    };
}
exports.textFieldAccessor = textFieldAccessor;
/**
 * @class rxForm
 */
class rxForm {
    constructor() {
        /**
         * @description **ALIASED** Directly uses {@link rxFieldName}.
         */
        this.fieldName = rxFieldName;
    }
    /**
     * @description
     * Set `value` in `formData` to the page object's current method `key`.
     * Aids in filling out form data via javascript objects.
     * For an example of this in use, see [encore-ui's end to end tests]{@link http://goo.gl/R7Frwv}.
     * @param {Object} reference - Context to evaluate under as `this` (typically, `this`).
     * @param {Object} formData - Key-value pairs of deeply-nested form items, and their values to fill.
     *
     * @example
     * class YourPage {
     *     form(formData) {
     *         rxForm.fill(this, formData);
     *     }
     *
     *     @textFieldAccessor(element(by.model('textbox'))) aTextbox;
     *
     *     @rxRadioAccessor(element(by.model('radioButton'))) aRadioButton;
     *
     *     @rxRadioAccessor(element(by.model('radioButton_1'))) anotherRadioButton;
     *
     *     @rxSelectAccessor(element(by.model('dropdown'))) aSelectDropdown;
     * });
     *
     * yourPage.form = {
     *     aTextbox: 'My Name',
     *     aRadioButton: true,
     *     aSelectDropdown: 'My Choice'
     * };
     * // executing the above would execute all `setter` methods of your form to equal the values listed above.
     */
    static fill(reference, formData) {
        var next = this;
        var page = reference;
        _.forEach(formData, function (value, key) {
            page[key] = value;
        });
    }
}
exports.rxForm = rxForm;
;
