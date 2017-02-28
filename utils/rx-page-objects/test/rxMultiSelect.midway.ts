'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {rxMultiSelect, exercise} from '../index';

let demoPage = require('../../demo.page');

describe('rxMultiSelect', function () {
    before(function () {
        demoPage.go('#/elements/Forms');
    });

    describe('(state) Valid Enabled', exercise.rxMultiSelect({
        instance: new rxMultiSelect($('#msValidEnabled')),
        inputs: ['Type A', 'Type B', 'Type C', 'Type D'],
        valid: true,
        disabled: false
    }));

    describe('(state) Valid Disabled', exercise.rxMultiSelect({
        instance: new rxMultiSelect($('#msValidDisabled')),
        inputs: ['Not Allowed'],
        valid: true,
        disabled: true
    }));

    describe('(state) Invalid Enabled', exercise.rxMultiSelect({
        instance: new rxMultiSelect($('#msInvalidEnabled')),
        inputs: ['Type A', 'Type B', 'Type C', 'Type D'],
        valid: false,
        disabled: false
    }));

    describe('(state) Invalid Disabled', exercise.rxMultiSelect({
        instance: new rxMultiSelect($('#msInvalidDisabled')),
        inputs: ['Not Allowed'],
        valid: false,
        disabled: true
    }));
});
