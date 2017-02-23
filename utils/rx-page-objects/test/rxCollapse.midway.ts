'use strict';

import {expect} from 'chai';
import {$, $$} from 'protractor';

import {rxCollapse, exercise} from '../index';

let demoPage = require('../../demo.page');

describe('rxCollapse', function () {

    before(function () {
        demoPage.go('#/elements/Collapse');
    });

    describe('custom title', exercise.rxCollapse({
        instance: new rxCollapse($('.demo-with-title')),
        title: 'A Custom Title',
        expanded: true
    }));

    describe('default title', exercise.rxCollapse({
        instance: new rxCollapse($('.demo-no-title')),
        expanded: false
    }));
});
