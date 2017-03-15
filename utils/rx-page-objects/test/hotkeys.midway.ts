'use strict';

import {expect} from 'chai';
import {by, element, ElementFinder} from 'protractor';
import {Key} from 'selenium-webdriver';

let demoPage = require('../../demo.page');

describe('hotkeys', () => {
    let volume: ElementFinder;
    let body: ElementFinder;

    before(() => {
        demoPage.go('#/utilities/hotkeys');
        volume = element(by.binding('volume'));
        body = element(by.css('body'));
    });

    // The demo page starts the volume at '5'.
    it('should turn volume up using hotkeys', () => {
        // turn it up
        let ctrlUp = Key.chord(Key.CONTROL, Key.ARROW_UP);
        body.sendKeys(ctrlUp);

        expect(volume.getText()).to.eventually.equal('6');
    });

    it('should turn volume down twice using hotkeys', () => {

        // turn it down
        let ctrlDown = Key.chord(Key.CONTROL, Key.ARROW_DOWN);
        body.sendKeys(ctrlDown);
        body.sendKeys(ctrlDown);

        expect(volume.getText()).to.eventually.equal('4');
    });
});
