'use strict';

import {expect} from 'chai';
import {$, $$} from 'protractor';
import * as moment from 'moment';
import * as _ from 'lodash';

import {rxAge} from '../index';

let demoPage = require('../../demo.page');

describe('rxAge', () => {
    let momentsTable, isoString;
    let oneHour = 1000 * 60 * 60;
    let ageStrings = [
        '10h 26m',
        '1d 12h',
        '40d 4h',
        '380d 2h',
        '10 hours, 26 minutes',
        '1 day, 12 hours',
        '40 days, 4 hours',
        '380 days, 2 hours',
        '10 hours',
        '1 day, 12 hours',
        '40 days, 4 hours, 48 minutes',
        '380 days, 2 hours, 24 minutes'
    ];

    before(() => {
        demoPage.go('#/utilities/rxAge');
        momentsTable = $$('#rxAge-demo ol li');
    });

    _.forEach(ageStrings, function (testData, index) {
        it('should still have ' + testData + ' as test data on the page', () => {
            momentsTable.get(index).getText().then(function (text) {
                var onPage = text.split('→')[1].trim();
                expect(onPage).to.equal(testData);
            });
        });

        it('should convert ' + testData + ' accurate within the hour', () => {
            momentsTable.get(index).getText().then(function (text) {
                isoString = new Date(text.split('→')[0].trim());
                expect(rxAge.toMoment(testData).valueOf()).to.be.closeTo(moment(isoString).valueOf(), oneHour);
            });
        });
    });
});
