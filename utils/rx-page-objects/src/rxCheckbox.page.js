'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const protractor_1 = require("protractor");
const rxComponent_1 = require("./rxComponent");
const _ = require("lodash");
/**
 * @description Functions for interacting with a single checkbox element.
 * @class
 */
class rxCheckbox extends rxComponent_1.rxComponentElement {
    get eleWrapper() {
        return this.element(protractor_1.by.xpath('..'));
    }
    get eleFakeCheckbox() {
        return this.eleWrapper.$('.fake-checkbox');
    }
    /**
     * @description Whether or not the element in question is a checkbox.
     */
    isCheckbox() {
        return this.getAttribute('type').then((type) => {
            return type === 'checkbox';
        });
    }
    /**
     * @description Whether the checkbox is currently displayed.
     */
    isDisplayed() {
        return this.eleFakeCheckbox.isPresent().then((isFakeCheckbox) => {
            return isFakeCheckbox ? this.eleFakeCheckbox.isDisplayed() : this.originalElement.isDisplayed();
        });
    }
    /**
     * @description Whether or not the checkbox is enabled.
     */
    isEnabled() {
        return this.eleFakeCheckbox.isPresent().then((isFakeCheckbox) => {
            if (isFakeCheckbox) {
                return this.eleWrapper.getAttribute('class').then((classes) => {
                    return !_.includes(classes.split(' '), 'rx-disabled');
                });
            }
            return this.originalElement.isEnabled();
        });
    }
    /**
     * @description Whether or not the checkbox is present on the page.
     */
    isPresent() {
        return this.eleFakeCheckbox.isPresent().then((isFakeCheckbox) => {
            return isFakeCheckbox || this.originalElement.isPresent();
        });
    }
    /**
     * @description Whether the checkbox is valid.
     */
    isValid() {
        return this.getAttribute('class').then((classes) => {
            return _.includes(classes.split(' '), 'ng-valid');
        });
    }
    /**
     * @instance
     * @function
     * @description Make sure checkbox is selected/checked.
     */
    select() {
        return this.isSelected().then((selected) => {
            if (!selected) {
                this.click();
            }
        });
    }
    /**
     * @instance
     * @function
     * @description Make sure checkbox is deselected.
     */
    deselect() {
        return this.isSelected().then((selected) => {
            if (selected) {
                this.click();
            }
        });
    }
}
__decorate([
    rxComponent_1.OverrideWebdriver
], rxCheckbox.prototype, "isDisplayed", null);
__decorate([
    rxComponent_1.OverrideWebdriver
], rxCheckbox.prototype, "isEnabled", null);
__decorate([
    rxComponent_1.OverrideWebdriver
], rxCheckbox.prototype, "isPresent", null);
exports.rxCheckbox = rxCheckbox;
function rxCheckboxAccessor(elem) {
    return (target, propertyKey) => {
        let checkbox = new rxCheckbox(elem);
        return {
            get: () => {
                return checkbox.isSelected();
            },
            set: (enable) => {
                enable ? checkbox.select() : checkbox.deselect();
            }
        };
    };
}
exports.rxCheckboxAccessor = rxCheckboxAccessor;
