'use strict';

import {expect} from 'chai';
import {$} from 'protractor';
let demoPage = require('../../demo.page');

describe('rxToggle', () => {
    let rxToggle, rxToggleContent;

    before(() => {
        demoPage.go('#/utilities/rxToggle');
        rxToggle = $('#vacillator');
        rxToggleContent = $('#vacillated');
    });

    it('should toggle content on show', () => {
        expect(rxToggleContent.isDisplayed()).to.eventually.be.false;
        rxToggle.click();

        expect(rxToggleContent.isDisplayed()).to.eventually.be.true;
        rxToggle.click();

        expect(rxToggleContent.isDisplayed()).to.eventually.be.false;
    });
});
