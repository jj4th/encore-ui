'use strict';

import {expect} from 'chai';
import {$} from 'protractor';

import {rxAccountInfo, rxAccountInfoBadge, rxNotify} from '../index';

let demoPage = require('../../demo.page');

describe('elements:account', () => {
    let account: rxAccountInfo;

    before(() => {
        demoPage.go('#/elements/AccountInfo');
        account = new rxAccountInfo($('.demo-simple-account rx-account-info'));
    });

    it('should show element', () => {
        expect(account.isDisplayed()).to.eventually.be.true;
    });

    it('should show the account name', () => {
        expect(account.getName()).to.eventually.equal('Mosso');
    });

    it('should show the account number', () => {
        expect(account.getNumber()).to.eventually.equal('12345');
    });

    it('should show the account access policy', () => {
        expect(account.getAccessPolicy()).to.eventually.equal('Full');
    });

    describe('badges', () => {
        it('should have four badges on the first Account Info box', () => {
            expect(account.badges.count()).to.eventually.equal(4);
        });

        it('should have the correct first badge src via byIndex', () => {
            let src = 'http://mirrors.creativecommons.org/presskit/icons/cc.large.png';
            let badge = new rxAccountInfoBadge(account.badges.get(0));
            expect(badge.getSrc()).to.eventually.equal(src);
        });

        it('should have the right name on the last badge', () => {
            let badge = new rxAccountInfoBadge(account.badges.last());
            expect(badge.getName()).to.eventually.equal('Public Domain');
        });

        it('should have the right description on the last badge', () => {
            let description = 'Waives as many rights as legally possible, worldwide.';
            let badge = new rxAccountInfoBadge(account.badges.last());
            expect(badge.getDescription()).to.eventually.equal(description);
        });
    });

    describe('account with warning status type', () => {
        let warningAccount: rxAccountInfo;

        before(() => {
            warningAccount = new rxAccountInfo($('.delinquent-account rx-account-info'));
        });

        it('should have a name', () => {
            expect(warningAccount.getName()).to.eventually.equal('DelinquentAccount');
        });

        it('should have a "deliquent" status', () => {
            expect(warningAccount.getStatus()).to.eventually.equal('Delinquent');
        });

        it('should have a "warn" type', () => {
            expect(warningAccount.getStatusType()).to.eventually.equal("warn");
        });

    });

    describe('account with info status type', () => {
        let infoAccount: rxAccountInfo;

        before(() => {
            infoAccount = new rxAccountInfo($('.unverified-account rx-account-info'));
        });

        it('should have a name', () => {
            expect(infoAccount.getName()).to.eventually.equal('UnverifiedAccount');
        });

        it('should have an "unverified" status', () => {
            expect(infoAccount.getStatus()).to.eventually.equal('Unverified');
        });

        it('should have an "info" type', () => {
            expect(infoAccount.getStatusType()).to.eventually.equal('info');
        });

    });

    describe('error messages', () => {

        it('should show an error notification when it cannot load badges', () => {
            let errorMessage = 'Error retrieving badges for this account';
            expect(rxNotify.byStack('badgeError').isPresent(errorMessage)).to.eventually.be.true;
        });

        it('should show an error notification when it cannot load account name', () => {
            let errorMessage = 'Error retrieving account name';
            expect(rxNotify.byStack('nameError').isPresent(errorMessage)).to.eventually.be.true;
        });
    });

});
