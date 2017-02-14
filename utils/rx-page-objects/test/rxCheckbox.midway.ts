'use strict';

import {expect} from 'chai';
import {$, $$} from 'protractor';
import * as moment from 'moment';
import * as _ from 'lodash';

import * as encore from '../index';

let demoPage = require('../../demo.page');

describe('rxCheckbox', () => {
    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('(State) Valid Enabled Checked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkValidEnabledOne')),
        disabled: false,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Enabled UnChecked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkValidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: true
    }));

    describe('(State) Valid Ng-Disabled Checked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkValidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Ng-Disabled Unchecked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkValidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Valid Disabled Checked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkValidDisabledOne')),
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Disabled Unchecked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkValidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Invalid Enabled Checked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkInvalidEnabledOne')),
        disabled: false,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Enabled UnChecked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkInvalidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: false
    }));

    describe('(State) Invalid Ng-Disabled Checked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkInvalidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Ng-Disabled Unchecked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkInvalidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false
    }));

    describe('(State) Invalid Disabled Checked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkInvalidDisabledOne')),
        disabled: true,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Disabled Unchecked', encore.exercise.rxCheckbox({
        instance: new encore.rxCheckbox($('#chkInvalidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false
    }));

    describe('plain HTML checkboxes', () => {
        describe('Valid Enabled Unchecked', encore.exercise.rxCheckbox({
            instance: new encore.rxCheckbox($('#plainHtmlNormal')),
            disabled: false,
            selected: false,
            valid: false
        }));

        describe('Valid Disabled Unchecked', encore.exercise.rxCheckbox({
            instance: new encore.rxCheckbox($('#plainHtmlDisabled')),
            disabled: true,
            selected: false,
            valid: false
        }));

        describe('Valid Enabled Checked', encore.exercise.rxCheckbox({
            instance: new encore.rxCheckbox($('#plainHtmlChecked')),
            disabled: false,
            selected: true,
            valid: false
        }));

    });

    describe('Show/Hide Input', () => {
        var chkSure, chkReallySure;

        before(() => {
            chkSure = new encore.rxCheckbox($('#chkAmSure'));
            chkReallySure = new encore.rxCheckbox($('#chkAmReallySure'));
        });

        describe('"Are you sure?"', () => {
            it('should be displayed', () => {
                expect(chkSure.isDisplayed()).to.eventually.be.true;
            });

            describe('when checked', () => {
                before(() => {
                    chkSure.select();
                });

                it('should be valid', () => {
                    expect(chkSure.isValid()).to.eventually.be.true;
                });

                it('should show "Are you REALLY sure?"', () => {
                    expect(chkReallySure.isDisplayed()).to.eventually.be.true;
                });
            });

            describe('when unchecked', () => {
                before(() => {
                    chkSure.deselect();
                });

                it('should not be valid', () => {
                    expect(chkSure.isValid()).to.eventually.be.false;
                });

                it('should not show "Are you REALLY sure?"', () => {
                    expect(chkReallySure.isDisplayed()).to.eventually.be.false;
                });
            });
        });

        describe('plain HTML checkboxes', () => {
            var willHide;
            var willBeHidden;

            before(() => {
                willHide = new encore.rxCheckbox($('#plainChkRemoveCheckbox'));
                willBeHidden = new encore.rxCheckbox($('#plainChkRemoveable'));
            });

            it('should show the checkbox by default', () => {
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
                expect(willBeHidden.isPresent()).to.eventually.be.true;
            });

            it('should remove the checkbox from the DOM', () => {
                willHide.select();
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

            it('should put the checkbox back', () => {
                willHide.deselect();
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
                expect(willBeHidden.isPresent()).to.eventually.be.true;
            });

        });
    });

    describe('Destroy Input', () => {
        var chkRemove, chkRemoveable;

        before(() => {
            chkRemove = new encore.rxCheckbox($('#chkRemoveCheckbox'));
            chkRemoveable = new encore.rxCheckbox($('#chkRemoveable'));
        });

        describe('when checked', () => {
            before(() => {
                chkRemove.select();
            });

            describe('Static Checkbox', () => {
                it('should not exist', () => {
                    expect(chkRemoveable.isPresent()).to.eventually.be.false;
                });
            });
        });

        describe('when unchecked', () => {
            before(() => {
                chkRemove.deselect();
            });

            describe('Static Checkbox', () => {
                it('should exist', () => {
                    expect(chkRemoveable.isPresent()).to.eventually.be.true;
                });
            });
        });
    });
});
