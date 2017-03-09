
'use strict';

import {ElementFinder, ElementArrayFinder} from 'protractor';
import {$, $$, browser, by} from 'protractor';
import {rxComponentElement, AccessorPromiseString, Promise, OverrideWebdriver} from './rxComponent';

/**
 * @description Functions for interacting with a single notification.
 * @see rxNotify
 */
export class rxNotification extends rxComponentElement {
    get btnDismiss() {
        return this.$('.notification-dismiss');
    }

    /**
     * @description The type of notification. See {@link rxNotify.types}.
     * @see rxNotify.types
     * @example
     * it('should have the right notification type', function () {
     *     var notificationType = encore.rxNotify.all.byText('Something bad happened').getType();
     *     expect(notificationType).to.eventually.equal('error');
     *     // or, you could write it this way
     *     expect(notificationType).to.eventually.equal(encore.rxNotify.types.error);
     * });
     */
    getType() {
        let notificationTypes = /error|info|success|warning/;
        return this.getAttribute('class').then((className) => {
            return className.match(notificationTypes)[0];
        });
    }

    /**
     * @description The message text of the notification.
     * @example
     * it('should have the right notification text', function () {
     *     var notificationText = encore.rxNotify.all.byText('Something bad happened').getText();
     *     expect(notificationText).to.eventually.equal('Something bad happened: Contact joe@rackspace.com');
     * });
     */
    @OverrideWebdriver
    getText() {
        return this.element(by.xpath('.')).getText().then((text) => {
            // Remove any lingering '× ' characters.
            return text.split('\n')[0].trim();
        });
    }

    /**
     * @description Dismisses the notification.
     * @example
     * it('should dismiss the notification', function () {
     *     var notification = encore.rxNotify.all.byText('Something bad happened');
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(1);
     *     notification.dismiss();
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(0);
     * });
     */
    dismiss() {
        return this.isDismissable().then((dismissable) => {
            if (dismissable) {
                this.btnDismiss.click();

                // hack for chrome support -- this is for any possible
                // alerts that are opened by closing this notification.
                // also, before you check, EC.isAlertPresent does not work here.
                return browser.getCapabilities().then((capabilities) => {
                    if (capabilities.get('browserName') === 'chrome') {
                        browser.sleep(500);
                    }
                });
            }
        });
    }

    hasSpinner() {
        return this.$('.rx-spinner').isPresent();
    }

    /**
     * @description Whether or not the notification includes an "x" on the far right side.
     * @example
     * it('should not let me close the warning on the page', function () {
     *     var notification = encore.rxNotify.byText('Warning: Outage in progress');
     *     expect(notification.type).to.eventually.equal(encore.rxNotify.types.warning);
     *     expect(notification.isDismissable()).to.eventually.be.false;
     * });
     */
    isDismissable() {
        return this.btnDismiss.isPresent();
    }

}

/**
 * @description Functions for interacting with groups of notifications, or getting a single notification.
 */
export class rxNotify {
    constructor(readonly rootElement: ElementFinder) {
    }

    get tblNotifications() {
        return this.rootElement.all(by.repeater('message in messages'));
    }

    /**
     * @description Returns a collection of functions used to interact with a group of notifications in a stack.
     * @see rxNotify.all
     * @example
     * it('should have some notifications in the top area', function () {
     *     expect(encore.rxNotify.byStack('banner').count()).to.eventually.be.above(0);
     *     expect(encore.rxNotify.all.count()).to.eventually.be.above(0);
     * });
     */
    static byStack(stackName: string) {
        let rootElement = $('.rx-notifications[stack="' + stackName + '"]');
        return new rxNotify(rootElement);
    }

    /**
     * @description Returns a collection of functions used to interact with all notifications on the page.
     * @see rxNotify.byStack
     * @example
     * it('should have some notifications in the top area', function () {
     *     expect(encore.rxNotify.all.count()).to.eventually.be.above(0);
     *     expect(encore.rxNotify.byStack('banner').count()).to.eventually.be.above(0);
     * });
     */
    static get all() {
        let rootElement = $('html');
        return new rxNotify(rootElement);
    }

    /**
     * @description The number of notifications present in the scope of the namespace. For instance,
     * calling this function on the object returned from {@link rxNotify.all} will inform you of the
     * number of notifications present *anywhere* on the page. Calling it on {@link rxNotify.byStack}
     * will return the count, but limited to the number of notifications in the stack selected.
     * @example
     * it('should have some notifications in the top area', function () {
     *     expect(encore.rxNotify.byStack('banner').count()).to.eventually.equal(1);
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(2);
     * });
     */
    count() {
        return this.tblNotifications.count();
    }

    /**
     * @description The resulting notification object that matches the `notificationText`. This notification
     * is searched for using a partial text matching strategy. If more than one notification contains
     * `notificationText`, only the first will be returned.
     * @example
     * it('should have a success message that personally thanks the user', function () {
     *     var notification = encore.rxNotify.all.byText('Good job, ');
     *     expect(notification.getText()).to.eventually.equal('Good job, ' + browser.params.username + '!');
     * });
     */
    byText(notificationText: string) {
        var rootElement = this.rootElement.element(by.cssContainingText('.rx-notification', notificationText));
        return new rxNotification(rootElement);
    }

    /**
     * @description Close all notifications in the current scope of notifications.
     * @example
     * it('should close some notifications', function () {
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(2);
     *     encore.rxNotify.byStack('banner').dismiss();
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(1);
     *     encore.rxNotify.all.dismiss();
     *     expect(encore.rxNotify.all.count()).to.eventually.equal(0);
     * });
     */
    dismiss() {
        return this.tblNotifications.map((notificationElement, index) => {
            let notification = new rxNotification(notificationElement);
            return notification.isDismissable().then((dismissable) => {
                if (dismissable) {
                    return index;
                }
            });
        }).then((dismissableIndexes) => {
            dismissableIndexes.reverse().forEach((index) => {
                // The above `.map` call will populate the list with `undefined` if undismissable. Ignore those.
                if (index !== undefined) {
                    let notification = new rxNotification(this.tblNotifications.get(index));
                    notification.dismiss();
                }
            });
        });
    }

    /**
     * @description Whether or not the notification matching text `string` exists in the current
     * scope of notifications. If no `type` is specified, all notifications are searched. If a
     * `type` is specified, only those types of notifications will be searched. See {@link rxNotify.types}
     * to see the list of notification types supported.
     * @example
     * it('should have the notification present', function () {
     *     expect(encore.rxNotify.all.isPresent('My message', 'error')).to.eventually.be.false;
     *     expect(encore.rxNotify.all.byText('My message').type).to.eventually.equal('info');
     *     expect(encore.rxNotify.all.isPresent('My message')).to.eventually.be.true;
     *     expect(encore.rxNotify.all.isPresent('My message', encore.rxNotify.types.info)).to.eventually.be.true;
     * });
     */
    isPresent(string: string, type?:string): Promise<boolean> {
        let elementsOfType: ElementArrayFinder;

        type = type ? '.notification-'.concat(type) : '[class^="notification-"]';
        elementsOfType = this.rootElement.all(by.cssContainingText(type, string));

        return elementsOfType.count().then((count) => (count > 0));
    }

    /**
     * @description A lookup for translating types of notifications and their string representations
     * @type {Object}
     * @property {String} error - 'error': A red notification. Used typically for errors or exceptions.
     * @property {String} info - 'info': A blue notification. Used typically for loading actions.
     * @property {String} success - 'success': A green notification. Used typically after successful actions.
     * @property {String} warning - 'warning': An orange warning. Used typically to "sticky" an ever-present message.
     */
    static types = {
        error: 'error',
        info: 'info',
        success: 'success',
        warning: 'warning'
    }
};