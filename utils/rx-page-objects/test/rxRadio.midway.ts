'use strict';

import {expect} from 'chai';
import {$, $$} from 'protractor';
import * as moment from 'moment';
import * as _ from 'lodash';

import * as encore from '../index';

let demoPage = require('../../demo.page');

describe('rxRadio', () => {
    var subject;

    before(() => {
        demoPage.go('#/elements/Forms');
    });

    describe('(State) Valid Enabled Selected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radValidEnabledOne')),
        disabled: false,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Enabled Unselected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radValidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: true
    }));

    describe('(State) Valid Disabled Selected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radValidDisabledOne')),
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Valid Disabled Unselected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radValidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Valid NG-Disabled Selected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radValidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: true
    }));

    describe('(State) Valid NG-Disabled Unselected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radValidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: true
    }));

    describe('(State) Invalid Enabled Selected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radInvalidEnabledOne')),
        disabled: false,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Enabled Unselected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radInvalidEnabledTwo')),
        disabled: false,
        selected: false,
        valid: false
    }));

    describe('(State) Invalid Disabled Selected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radInvalidDisabledOne')),
        disabled: true,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid Disabled Unselected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radInvalidDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false
    }));

    describe('(State) Invalid NG-Disabled Selected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radInvalidNgDisabledOne')),
        disabled: true,
        selected: true,
        valid: false
    }));

    describe('(State) Invalid NG-Disabled Unselected', encore.exercise.rxRadio({
        instance: new encore.rxRadio($('#radInvalidNgDisabledTwo')),
        disabled: true,
        selected: false,
        valid: false
    }));

    describe('plain HTML radio buttons', () => {
        describe('Valid Enabled Unchecked', encore.exercise.rxRadio({
            instance: new encore.rxRadio($('#plainRadNormal')),
            disabled: false,
            selected: false,
            valid: false
        }));

        describe('Valid Disabled Unchecked', encore.exercise.rxRadio({
            instance: new encore.rxRadio($('#plainRadDisabled')),
            disabled: true,
            selected: false
        }));

        describe('Valid Enabled Checked', encore.exercise.rxRadio({
            instance: new encore.rxRadio($('#plainRadChecked')),
            disabled: false,
            selected: false
        }));
    });

    describe('Show/Hide Input', () => {
        var radHate, radLike, radLove;

        before(() => {
            radHate = new encore.rxRadio($('#radHateBacon'));
            radLike = new encore.rxRadio($('#radLikeBacon'));
            radLove = new encore.rxRadio($('#radLoveBacon'));
        });

        describe('"I hate bacon"', () => {
            before(() => {
                subject = radHate;
            });

            it('should be visible', () => {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });

            it('should not be valid', () => {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('"Actually, I LOVE bacon"', () => {
            before(() => {
                subject = radLove;
            });

            it('should not be visible', () => {
                expect(subject.isDisplayed()).to.eventually.be.false;
            });

            it('should not be valid', () => {
                expect(subject.isValid()).to.eventually.be.false;
            });
        });

        describe('"I like bacon"', () => {
            before(() => {
                subject = radLike;
            });

            it('should be visible', () => {
                expect(subject.isDisplayed()).to.eventually.be.true;
            });

            it('should not be valid', () => {
                expect(subject.isValid()).to.eventually.be.false;
            });

            describe('when selected', () => {
                before(() => {
                    subject.select();
                });

                it('should be valid', () => {
                    expect(subject.isValid()).to.eventually.be.true;
                });

                describe('"I hate bacon"', () => {
                    it('should be valid', () => {
                        expect(radHate.isValid()).to.eventually.be.true;
                    });
                });

                describe('"Actually, I LOVE bacon"', () => {
                    before(() => {
                        subject = radLove;
                    });

                    it('should be visible', () => {
                        expect(subject.isDisplayed()).to.eventually.be.true;
                    });

                    it('should be valid', () => {
                        expect(subject.isValid()).to.eventually.be.true;
                    });
                });
            });
        });

        describe('plain HTML radio buttons', () => {
            var willHide;
            var willBeHidden;
            var otherRadio;

            before(() => {
                willHide = new encore.rxRadio($('#plainRadRemoveRadio'));
                willBeHidden = new encore.rxRadio($('#plainRadRemoveable'));
                otherRadio = new encore.rxRadio($('#plainRadNormal'));
            });

            it('should show the radio button by default', () => {
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

            it('should remove the radio button from the DOM', () => {
                willHide.select();
                expect(willBeHidden.isDisplayed()).to.eventually.be.true;
                expect(willBeHidden.isPresent()).to.eventually.be.true;
            });

            it('should put the radio button back', () => {
                otherRadio.select();
                expect(willBeHidden.isPresent()).to.eventually.be.false;
            });

        });
    });//Show/Hide Input

    describe('Destroy Input', () => {
        var radCreated, radDestroyed, radTargetCreated;

        before(() => {
            radCreated = new encore.rxRadio($('#radCreated'));
            radDestroyed = new encore.rxRadio($('#radDestroyed'));
            radTargetCreated = new encore.rxRadio($('#radTargetCreated'));
        });

        it('"Destroyed" should be selected', () => {
            expect(radDestroyed.isSelected()).to.eventually.be.true;
        });

        it('"Created" should not be selected', () => {
            expect(radCreated.isSelected()).to.eventually.be.false;
        });

        it('target radio should not be present', () => {
            radTargetCreated = new encore.rxRadio($('#radTargetCreated'));
            expect(radTargetCreated.isPresent()).to.eventually.be.false;
        });

        describe('when "Created" is selected', () => {
            before(() => {
                radCreated.select();
            });

            it('"Destroyed" should not be selected', () => {
                expect(radDestroyed.isSelected()).to.eventually.be.false;
            });

            it('target radio should be present', () => {
                radTargetCreated = new encore.rxRadio($('#selTargetCreated'));
                expect(radTargetCreated.isPresent()).to.eventually.be.true;
            });
        });

        describe('when "Destroyed" is selected again', () => {
            before(() => {
                radDestroyed.select();
            });

            it('"Created" should not be selected', () => {
                expect(radCreated.isSelected()).to.eventually.be.false;
            });

            it('target radio should not be present', () => {
                radTargetCreated = new encore.rxRadio($('#radTargetCreated'));
                expect(radTargetCreated.isPresent()).to.eventually.be.false;
            });
        });
    });//Destroy Input
});
