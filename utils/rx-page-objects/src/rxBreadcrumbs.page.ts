'use strict';
import {ElementFinder} from 'protractor';
import {by} from 'protractor';
import {OverrideWebdriver, Promise, rxComponentElement} from './rxComponent';

/**
 * @description Properties around a single breadcrumb.
 */
export class rxBreadcrumb extends rxComponentElement {
    /**
     * @description The inner text of the breadcrumb.
     */
    getName() {
        return this.element(by.exactBinding('breadcrumb.name')).getText();
    }

    get lblTag() {
        return this.$('.status-tag');
    }

    /**
     * @description The label tag's inner text, if present. Otherwise, `null`.
     */
    getTag(): Promise<string>|Promise<null> {
        return this.lblTag.getText().then(undefined, () => null);
    }

    /**
     * @description The href present in the breadcrumb, if present. Otherwise, `null`.
     */
    getHref(): Promise<string>|Promise<null> {
        return this.$('a').getAttribute('href').then(undefined, () => null);
    }

    /**
     * @description Click the breadcrumb to visit it.
     */
    @OverrideWebdriver
    click() {
        return this.$('a').click();
    }

    /**
     * @description Whether or not the breadcrumb is the first in a group of breadcrumbs.
     */
    isFirst() {
        return this.element(by.className('first')).isPresent();
    }

    /**
     * @description Whether or not the breadcrumb is last in a group of breadcrumbs.
     */
    isLast() {
        return this.element(by.className('last')).isPresent();
    }

    /**
     * @description Whether or not a breadcrumb has an anchor tag in it somewhere.
     */
    isLink() {
        return this.$('a').isPresent();
    }
}

/**
 * @description Properties around a collection of breadcrumbs.
 */
export class rxBreadcrumbs extends rxComponentElement {

    get tblBreadcrumbs() {
        return this.all(by.repeater('breadcrumb in breadcrumbs.getAll(status)'));
    }

    /**
     * @description Select a single breadcrumb by name, case sensitive.
     * If multiple entries exist with the same name, the first will be returned.
     */
    byName(breadcrumbName: string) {
        let eleBreadcrumb = this.tblBreadcrumbs.filter((breadcrumbElement: ElementFinder) => {
            return breadcrumbElement.element(by.exactBinding('breadcrumb.name')).getText().then(name => {
                return name === breadcrumbName;
            });
        }).get(0);
        return new rxBreadcrumb(eleBreadcrumb);
    }

    /**
     * @description Select a single breadcrumb by position (index).
     */
    byPosition(position: number) {
        return new rxBreadcrumb(this.tblBreadcrumbs.get(position));
    }

    /**
     * @description The total number of breadcrumbs present in total.
     */
    @OverrideWebdriver
    count() {
        return this.tblBreadcrumbs.count();
    }

    /**
     * @instance
     * @type {String[]}
     * @description A list of all breadcrumbs by name.
     * @returns {rxBreadcrumbs.breadcrumb}
     * @example
     * expect(encore.rxBreadcrumbs.initialize().names).to.eventually.eql(['Home', 'More']);
     */
    getNames() {
        return this.tblBreadcrumbs.map(breadcrumbElement => {
            return breadcrumbElement.element(by.exactBinding('breadcrumb.name')).getText();
        });
    }

};
