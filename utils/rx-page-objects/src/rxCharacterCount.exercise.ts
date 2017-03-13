'use strict';

import {expect} from 'chai';
import * as _ from 'lodash';

import * as component from './rxCharacterCount.page';

interface IRxCharacterCountExerciseOptions {
    instance: component.rxCharacterCount;
    highlight?: boolean;
    ignoreInsignificantWhitespace?: boolean;
    maxCharacters?: number;
    nearLimit?: number;
}
/**
 * @description rxCharacterCount exercises.
 * @example
 * describe('default exercises', encore.exercise.rxCharacterCount({
 *     instance: myPage.submission // select one of many widgets from your page objects
 *     maxCharacters: 25,
 *     nearLimit: 12,
 *     ignoreInsignificantWhitespace: false
 * }));
 */
export function rxCharacterCount (options: IRxCharacterCountExerciseOptions) {
    options = _.defaults(options, {
        highlight: false,
        ignoreInsignificantWhitespace: true,
        maxCharacters: 254,
        nearLimit: 10,
    });

    let belowNearLimitLength = options.maxCharacters - options.nearLimit;
    let atNearLimitLength = options.maxCharacters + 2 - options.nearLimit;
    let overLimit = options.maxCharacters + 1;
    let aboveNearLimitLength = options.maxCharacters + 3 - options.nearLimit;
    let whitespace = '    leading and trailing whitespace    ';
    let whitespaceLength = whitespace.length;
    let trimmedLength = whitespace.trim().length;

    return () => {
        let characterCount: component.rxCharacterCount;

        before(() => {
            characterCount = options.instance;
        });

        it('should show element', () => {
            expect(characterCount.isDisplayed()).to.eventually.be.true;
        });

        describe('with empty value', () => {

            beforeEach(() => {
                characterCount.comment = '';
            });

            it('should not set the near-limit class', () => {
                expect(characterCount.isNearLimit()).to.eventually.be.false;
            });

            it('should have ' + options.maxCharacters + ' remaining characters', () => {
                expect(characterCount.remaining).to.eventually.equal(options.maxCharacters);
            });

            it('should not set the over-limit class', () => {
                expect(characterCount.isOverLimit()).to.eventually.be.false;
            });
        });

        describe('with "Foo" value', () => {

            beforeEach(() => {
                characterCount.comment = 'Foo';
            });

            it('should update the remaining number of characters', () => {
                expect(characterCount.remaining).to.eventually.equal(options.maxCharacters - 3);
            });

            describe('and changed to "Bar"', () => {

                beforeEach(() => {
                    characterCount.comment = 'Bar';
                });

                it('should replace value with new text', () => {
                    expect(characterCount.comment).to.eventually.equal('Bar');
                });
            });
        });

        describe('when ' + belowNearLimitLength + ' characters are entered', () => {

            beforeEach(() => {
                characterCount.comment = 'a'.repeat(belowNearLimitLength);
            });

            it('should not set the near-limit class ', () => {
                expect(characterCount.isNearLimit()).to.eventually.be.false;
            });
        });

        describe('when ' + atNearLimitLength + ' near limit characters are entered', () => {

            beforeEach(() => {
                characterCount.comment = 'b'.repeat(atNearLimitLength);
            });

            it('should set the near-limit class', () => {
                expect(characterCount.isNearLimit()).to.eventually.be.true;
            });
        });

        describe('when ' + aboveNearLimitLength + ' above limit characters are entered', () => {

            beforeEach(() => {
                characterCount.comment = 'c'.repeat(aboveNearLimitLength);
            });

            it('should set the near-limit class', () => {
                expect(characterCount.isNearLimit()).to.eventually.be.true;
            });
        });

        describe('when ' + options.maxCharacters + ' characters are entered', () => {

            beforeEach(() => {
                characterCount.comment = 'd'.repeat(options.maxCharacters);
            });

            it('should not set the over-limit class', () => {
                expect(characterCount.isOverLimit()).to.eventually.be.false;
            });

            it('should have zero remaining characters', () => {
                expect(characterCount.remaining).to.eventually.equal(0);
            });
        });

        describe('when ' + overLimit + ' characters are entered', () => {

            beforeEach(() => {
                characterCount.comment = 'e'.repeat(overLimit);
            });

            it('should set the over-limit class', () => {
                expect(characterCount.isOverLimit()).to.eventually.be.true;
            });

            it('should display a negative number when the over-limit class is reached', () => {
                expect(characterCount.remaining).to.eventually.equal(-1);
            });
        });

        describe('with leading and trailing whitespace', () => {

            beforeEach(() => {
                characterCount.comment = whitespace;
            });

            if (options.ignoreInsignificantWhitespace) {
                it('should count the trimmed length', () => {
                    expect(characterCount.remaining).to.eventually.equal(options.maxCharacters - trimmedLength);
                });
            } else {
                it('should count the full length', () => {
                    expect(characterCount.remaining).to.eventually.equal(options.maxCharacters - whitespaceLength);
                });
            }
        });

        if (options.highlight) {
            describe('highlighting', () => {

                it('should not show any highlights on an empty text box', () => {
                    // A space is used because the `input` event is not fired by clear() or sendKeys('')
                    characterCount.comment = ' ';
                    expect(characterCount.getOverLimitText()).to.eventually.equal('');
                });

                it('should not highlight any characters when ' + options.maxCharacters + ' characters are entered',
                    () => {
                        characterCount.comment = 'f'.repeat(options.maxCharacters);
                        expect(characterCount.getOverLimitText()).to.eventually.equal('');
                    },
                );

                it('should highlight a single characters when ' + overLimit + ' characters are entered', () => {
                    characterCount.comment = 'g'.repeat(overLimit);
                    expect(characterCount.getOverLimitText()).to.eventually.equal('g');
                });

                it('should clear the over-limit text highlighting when the text is reduced', () => {
                    characterCount.comment = 'h';
                    expect(characterCount.getOverLimitText()).to.eventually.equal('');
                });
            });
        }

        after(() => {
            characterCount.comment = '';
        });

    };
};
