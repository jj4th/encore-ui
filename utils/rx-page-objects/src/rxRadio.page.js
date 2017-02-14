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
 * @class
 */
class rxRadio extends rxComponent_1.rxComponentElement {
    get eleWrapper() {
        return this.element(protractor_1.by.xpath('..'));
    }
    get eleFakeRadio() {
        return this.eleWrapper.$('.fake-checkbox');
    }
    /**
     * @description Whether or not the element in question is a radio button.
     * Useful for situations where input types might change in the future, ensuring that the expected one is being used.
     */
    isRadio() {
        return this.getAttribute('type').then((type) => {
            return type === 'radio';
        });
    }
    /**
     * @description Whether the radio button is valid.
     */
    isValid() {
        return this.getAttribute('class').then((classes) => {
            return _.includes(classes.split(' '), 'ng-valid');
        });
    }
    /**
     * @description Whether the radio element is currently displayed.
     */
    isDisplayed() {
        return this.eleFakeRadio.isPresent().then((isFakeRadio) => {
            return isFakeRadio ? this.eleFakeRadio.isDisplayed() : this.isDisplayed();
        });
    }
    /**
     * @description Whether or not the radio element is enabled.
     */
    isEnabled() {
        return this.eleFakeRadio.isPresent().then((isFakeRadio) => {
            if (isFakeRadio) {
                return this.eleWrapper.getAttribute('class').then((classes) => {
                    return !_.includes(classes.split(' '), 'rx-disabled');
                });
            }
            return this.isEnabled();
        });
    }
    /**
     * @description Makes sure that the radio button is selected. If the radio button is already
     * selected, this function will do nothing.
     */
    select() {
        return this.isSelected().then(function (selected) {
            if (!selected) {
                this.click();
            }
        });
    }
}
__decorate([
    rxComponent_1.OverrideWebdriver
], rxRadio.prototype, "isDisplayed", null);
__decorate([
    rxComponent_1.OverrideWebdriver
], rxRadio.prototype, "isEnabled", null);
exports.rxRadio = rxRadio;
function rxRadioAccessor(elem) {
    return (target, propertyKey) => {
        let radio = new rxRadio(elem);
        return {
            get: function () {
                return radio.isSelected();
            },
            // passing `false` to this will do nothing.
            set: function (enable) {
                if (enable) {
                    radio.select();
                }
            }
        };
    };
}
exports.rxRadioAccessor = rxRadioAccessor;
;
