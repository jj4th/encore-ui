'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';
import * as moment from 'moment';

import * as component from './rxFieldName.page';
import {Promise} from './rxComponent';

interface rxFieldNameExerciseOptions {
    instance?: component.rxFieldName;
    visible?: boolean,
    present?: boolean,
    required?: boolean
}

/**
 * rxFieldName exercises.
 */
export function rxFieldName (options: rxFieldNameExerciseOptions) {
    if (options === undefined) {
        options = {};
    }

    options = _.defaults(options, {
        visible: true,
        present: true,
        required: false
    });

    return () => {
        var component;

        before(() => {
            component = options.instance;
        });

        it('should ' + (options.visible ? 'be' : 'not be') + ' visible', () => {
            expect(component.isDisplayed()).to.eventually.eq(options.visible);
        });

        if (options.present === true) {
            it('should be present', () => {
                expect(component.isPresent()).to.eventually.be.true;
            });

            it('should have a symbol present', () => {
                expect(component.isSymbolPresent()).to.eventually.be.true;
            });
        } else {
            it('should not be present', () => {
                expect(component.isPresent()).to.eventually.be.false;
            });

            it('should not have a symbol present', () => {
                expect(component.isSymbolPresent()).to.eventually.be.false;
            });
        }

        if (options.required === true) {
            it('should have a symbol visible', () => {
                expect(component.isSymbolDisplayed()).to.eventually.be.true;
            });
        } else {
            it('should not have a symbol visible', () => {
                expect(component.isSymbolDisplayed()).to.eventually.be.false;
            });
        }
    };
};
