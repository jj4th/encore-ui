'use strict';

import {expect} from 'chai';
import {$, browser} from 'protractor';

import {rxBreadcrumb, rxBreadcrumbs} from '../index';

let demoPage = require('../../demo.page');

describe('elements:rxBreadcrumbs', () => {
    let breadcrumbs: rxBreadcrumbs;

    before(() => {
        demoPage.go('#/elements/Breadcrumbs');
        breadcrumbs = new rxBreadcrumbs($('.module-demo rx-breadcrumbs'));
    });

    it('should show the element', () => {
        expect(breadcrumbs.isDisplayed()).to.eventually.be.true;
    });

    it('should have the proper count', () => {
        expect(breadcrumbs.count()).to.eventually.eql(3);
    });

    it('should have the proper names', () => {
        let expected = ['Overview', 'Elements', 'All Elements'];
        expect(breadcrumbs.getNames()).to.eventually.eql(expected);

    });

    describe('first breadcrumb', () => {
        let first: rxBreadcrumb;

        before(() => {
            first = breadcrumbs.byPosition(0);
        });

        it('should fetch a single breadcrumb by position', () => {
            expect(first).to.not.be.empty;
        });

        it('should be the first breadcrumb', () => {
            expect(first.isFirst()).to.eventually.be.true;
        });

        it('should not be the last breadcrumb', () => {
            expect(first.isLast()).to.eventually.be.false;
        });

        it('should have the name "Overview"', () => {
            expect(first.getName()).to.eventually.equal('Overview');
        });

        it('should not have a tag', () => {
            expect(first.lblTag.isPresent()).to.eventually.be.false;
        });

        it('should have the href "/#/overview"', () => {
            expect(first.getHref()).to.eventually.equal(browser.baseUrl + '/#/overview');
        });
    });

    describe('last breadcrumb', () => {
        let last: rxBreadcrumb;

        before(() => {
            last = breadcrumbs.byPosition(-1);
        });

        it('should fetch a single breadcrumb by position', () => {
            expect(last).to.not.be.empty;
        });

        it('should not be the first breadcrumb', () => {
            expect(last.isFirst()).to.eventually.be.false;
        });

        it('should be the last breadcrumb', () => {
            expect(last.isLast()).to.eventually.be.true;
        });

        it('should have the name "All Elements"', () => {
            expect(last.getName()).to.eventually.equal('All Elements');
        });

        it('should have a "DEMO TAG" tag',  () => {
            expect(last.lblTag.isPresent()).to.eventually.be.true;
            expect(last.getTag()).to.eventually.equal('DEMO TAG');
        });

        it('should have no href property', () => {
            expect(last.isLink()).to.eventually.be.false;
            expect(last.getHref()).to.eventually.be.null;
        });
    });

    describe('by name', () => {
        let middle: rxBreadcrumb;

        before(() => {
            middle = breadcrumbs.byName('Elements');
        });

        it('should fetch a single breadcrumb by position', () => {
            expect(middle).to.not.be.empty;
        });

        it('should not be the first breadcrumb', () => {
            expect(middle.isFirst()).to.eventually.be.false;
        });

        it('should not be the last breadcrumb', () => {
            expect(middle.isLast()).to.eventually.be.false;
        });

        it('should have the name "Elements"', () => {
            expect(middle.getName()).to.eventually.equal('Elements');
        });

        it('should not have a tag', () => {
            expect(middle.getTag()).to.eventually.be.null;
            expect(middle.lblTag.isPresent()).to.eventually.be.false;
        });

        it('should have an href property', () => {
            expect(middle.isLink()).to.eventually.be.true;
            expect(middle.getHref()).to.eventually.equal(browser.baseUrl + '/#/elements');
        });

        it('should visit the correct page when clicking on the breadcrumb', () => {
            let componentsHref = browser.baseUrl + '/#/elements';

            middle.click();
            expect(browser.getCurrentUrl()).to.eventually.equal(componentsHref);
        });

        after(() => {
            demoPage.go('#/elements/Breadcrumbs');
        });
    });
});
