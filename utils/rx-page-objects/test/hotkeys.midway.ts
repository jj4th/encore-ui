'use strict';

import {Key} from 'selenium-webdriver';
import {expect} from 'chai';
import {element, by} from 'protractor';
import * as moment from 'moment';
import * as _ from 'lodash';

import {rxCheckbox, exercise} from '../index';

let demoPage = require('../../demo.page');

describe('hotkeys', () => {
    var volume, body;

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
