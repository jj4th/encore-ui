'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {Typeahead} from '../index';

let demoPage = require('../../demo.page');

describe('typeahead', function () {
    let typeahead: Typeahead;

    before(function () {
        demoPage.go('#/elements/Typeahead');
        typeahead = new Typeahead($('#typeahead'));
    });

    it('should show element', function () {
        expect(typeahead.isDisplayed()).to.eventually.be.true;
    });

    it('should hide the menu initially', function () {
        expect(typeahead.isOpen()).to.eventually.be.false;
    });

    it('should show the menu when clicked', function () {
        typeahead.click();
        expect(typeahead.isOpen()).to.eventually.be.true;
    });

    it('should hide the menu when the input loses focus', function () {
        $('body').click();
        expect(typeahead.isOpen()).to.eventually.be.false;
    });
});
