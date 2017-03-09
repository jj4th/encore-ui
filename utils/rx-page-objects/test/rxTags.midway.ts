'use strict';

import {expect} from 'chai';
import {$} from 'protractor';
import {rxTags, exercise} from '../index';

let demoPage = require('../../demo.page');

describe('rxTags', () => {
    before(() => {
        demoPage.go('#/elements/Tags');
    });

    describe('exercises', exercise.rxTags({
        instance: new rxTags($('#standard-tags')),
        sampleText: 'orange'
    }));
});