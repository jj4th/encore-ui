'use strict';

import {ElementFinder, ElementArrayFinder} from 'protractor';
import {$, $$, browser, by} from 'protractor';
import {rxComponentElement, AccessorPromiseString, Promise, OverrideWebdriver} from './rxComponent';
import {rxMisc} from './rxMisc.page';
import * as _ from 'lodash';

/**
 * @class
 */
export class rxSelect extends rxComponentElement {

    get eleWrapper() {
        return this.element(by.xpath('..'));
    }

    get eleFakeSelect() {
        return this.eleWrapper.$('.fake-select');
    }

    /**
     * @description Whether or not the select element is enabled.
     */
    @OverrideWebdriver
    isEnabled() {
        return this.eleFakeSelect.isPresent().then((isFakeSelect) => {
            if(isFakeSelect) {
                return this.eleWrapper.getAttribute('class').then(function (classes) {
                    return !_.includes(classes.split(' '), 'rx-disabled');
                });
            }
            return this.originalElement.isEnabled();
        });
    }

    /**
     * @description Whether the select element is currently displayed.
     */
    @OverrideWebdriver
    isDisplayed() {
        return this.eleFakeSelect.isDisplayed().then(displayed => {
            return displayed ? this.eleFakeSelect.isDisplayed() : false;
        }, () => {
            return this.originalElement.isDisplayed();
        });
    }

    /**
     * @description Whether or not the select element exists on the page.
     */
    @OverrideWebdriver
    isPresent() {
        return this.eleFakeSelect.isPresent().then((isFakeSelect) => {
            return isFakeSelect || this.originalElement.isPresent();
        });
    }

    /**
     * @description Whether the `<select>` element is valid.
     */
    isValid() {
        return this.getAttribute('class').then(function (classes) {
            return _.includes(classes.split(' '), 'ng-valid');
        });
     }

    /**
     * @description The options in the dropdown.
     * @example
     * it('should have every Texas location in the dropdown', function () {
     *     var texasLocations = ['San Antonio', 'Austin'];
     *     var dropdown = new encore.rxSelect(element(by.model('locations')));
     *     expect(dropdown.options.getText()).to.eventually.eql(texasLocations);
     * });
     */
    get options() {
        return this.$$('option');
    }

    /**
     * @description The currently selected `<option>` element.
     * @example
     * it('should already have the username populated', function () {
     *     var dropdown = new encore.rxSelect(element(by.model('username')));
     *     expect(dropdown.selectedOption.getText()).to.eventually.equal('Andrew Yurisich');
     * });
     */
    get selectedOption() {
        return this.$('option:checked');
    }

    option(optionText) {
        return this.element(by.cssContainingText('option', optionText));
    }

    /**
     * @description High level access to change an rxSelect component's selected option.
     * @example
     * it('should select the United States for the country', function () {
     *     var dropdown = new encore.rxSelect($('#country-select'));
     *     dropdown.select('United States');
     *     expect(dropdown.selectedOption.getText()).to.eventually.equal('United States');
     * });
     */
    select(optionText) {
        return this.option(optionText).click();
    }
}

/**
 * @description Generates a getter and a setter for an rxSelect element on your page.
 * @example
 * class MyForm {
 *     @rxSelectAccessor(element(by.model('states'))) state;
 *     // you can specify a single dropdown's slow clicking globally this way
 *     @rxSelectAccessor(element(by.model('county'))) country;
 * };
 *
 * let form = new MyForm();
 *
 * it('should select a new state normally', function () {
 *     form.state = 'Indiana';
 *     expect(form.state).to.eventually.equal('Indiana');
 * });
 */
export function rxSelectAccessor(elem: ElementFinder) {
    return function (target, propertyKey): any {
        let select = new rxSelect(elem);
        return {
            get: function () {
                return select.selectedOption.getText();
            },
            set: function (optionText) {
                select.select(optionText);
            }
        };
    }
};
