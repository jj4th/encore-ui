'use strict';
import {by} from 'protractor';
import {rxComponentElement} from './rxComponent';

/**
 * @class
 */
export class rxAccountInfoBadge extends rxComponentElement {
    /**
     * @description The attribute under `ng-src` for a single badge.
     */
    getSrc() {
        return this.getAttribute('ng-src');
    }

    /**
     * @description The `data-name` attribute from a single badge.
     */
    getName() {
        return this.getAttribute('data-name');
    }

    /**
     * @description Will get the `data-description` attribute from a single badge.
     */
    getDescription() {
        return this.getAttribute('data-description');
    }

};

/**
 * @class
 */
export class rxAccountInfo extends rxComponentElement {
    private get _status() {
        return this.$('.account-status');
    }

    get badges() {
        return this.$$('.account-info-badge img');
    }

    /**
     * @description The name of the account.
     */
    getName() {
        return this.element(by.binding('accountName')).getText();
    }

    /**
     * @description The account number.
     */
    getNumber() {
        return this.element(by.binding('accountNumber')).getText();
    }

    /**
     * @description The account access policy.
     */
    getAccessPolicy() {
        return this.element(by.binding('accountAccessPolicy')).getText();
    }

    /**
     * @description The resulting status is lowercased so that it is easy to use with {@link rxAccountInfo.statuses}.
     */
    getStatus() {
        return this._status.getText();
    }

    /**
     * @description Parses a class name from the DOM to determine what the status of the account is.
     * Designed to be easily compared with {@link rxAccountInfo.statusTypes}.
     */
    getStatusType() {
        return this._status.getAttribute('class').then(classNames => {
            let className = classNames.match(/msg-(\w+)/);
            return className === null ? 'active' : className[1];
        });
    }
};
