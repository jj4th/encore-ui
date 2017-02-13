'use strict';

import {ElementFinder, ElementArrayFinder} from 'protractor';
import {$, $$, browser, by} from 'protractor';
import {rxComponentElement, AccessorPromiseString, Promise} from './rxComponent';
import * as _ from 'lodash';

let rxModalAction = require('./rxModalAction.page').rxModalAction;

/**
 * @description Clicking an action menu item will create an instance of this class.
 */
export class rxAction extends rxComponentElement {
    /**
     * @description Returns a modal object to manipulate later, with given `customFunctionality`.
     * See {@link rxModalAction.initialize} for more information about what `customFunctionality` means here.
     * Using a modal object is the default action since many instances of the action menu serve to launch
     * modals. If you're not using rxActionMenu to launch modals, over-ride this entire section
     * when calling <a href="#encore.module_rxActionMenu.initialize">rxActionMenu.initialize</a>,
     * where you can pass in a custom `actionConstructorFn`.
     */
    openModal(customFunctionality) {
        this.$('.modal-link').click();
        return rxModalAction.initialize(customFunctionality);
    }
}

/**
 * @description Functions for querying actions in an action menu, and launching those actions.
 * @class
 */
export class rxActionMenu extends rxComponentElement {
    /**
     * @description This selector will grab any top-level child elements under `.actions-area`, one level deep.
     * Since action menus allow for free-form html entry, there is no guarantee that any
     * particular structure will appear inside the action menu. However, we can be sure
     * that they'll use the `.actions-area` class to style it, and inside of it will be some
     * sort of element list. This exposes a hook into the html for matching text or counting nodes.
     */
    cssFirstAny = '.actions-area > *';
    actionClass = rxAction;


    constructor(rootElement: ElementFinder, actionClass?: typeof rxAction) {
        super(rootElement);
        if (actionClass) {
            this.actionClass = actionClass;
        }
    }

    get icoCog() {
        return this.$('.fa-cog');
    }

    /**
     * @description Whether or not the action cog is showing its underlying menu.
     */
    isExpanded() {
        return this.$('.action-list').getAttribute('class').then(function (className) {
            return className.indexOf('ng-hide') === -1;
        });
    }

    /**
     * @description Clicks the action cog to expand the action menu, unless it's already open.
     */
    expand(): void {
        this.isExpanded().then((expanded) => {
            if (!expanded) {
                this.icoCog.click();
            }
        });
    }

    /**
     * @description Clicks the action cog to collapse the action menu, unless it's already closed.
     */
    collapse(): void {
        this.isExpanded().then((expanded) => {
            if (expanded) {
                this.icoCog.click();
            }
        });
    }

    /**
     * @description Whether or not the action menu has an item matching the text `actionName`.
     * Will expand the action menu to determine if the action is available.
     */
    hasAction(actionName) {
        this.expand();
        let actionElement = this.element(by.cssContainingText(this.cssFirstAny, actionName));
        return actionElement.isDisplayed().then((displayed) => displayed, () => false);
    }

    /**
     * @description Defaults to returning an {@link rxActionMenu.action} object if none was specified at
     * initialization. See {@link rxActionMenu.initialize} for more details about passing in a custom action item
     * function.
     */
    action(actionName) {
        this.expand();
        var actionElement = this.element(by.cssContainingText(this.cssFirstAny, actionName));
        return new this.actionClass(actionElement);
    }

    /**
     * @description The number of action items present in the action menu.
     * Does not expand the action menu to determine the count of menu items.
     */
    actionCount() {
        return this.$$(this.cssFirstAny).count();
    }

};
