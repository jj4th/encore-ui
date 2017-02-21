export {rxComponentElement} from './src/rxComponent';
export {rxAccountInfo, rxAccountInfoBadge} from './src/rxAccountInfo.page';
export {rxActionMenu, rxAction} from './src/rxActionMenu.page';
export {rxAge} from './src/rxAge.page';
export {rxBreadcrumbs, rxBreadcrumb} from './src/rxBreadcrumbs.page';
export {rxCheckbox, rxCheckboxAccessor} from './src/rxCheckbox.page';
export {rxDatePicker} from './src/rxDatePicker.page';
export {rxFieldName} from './src/rxFieldName.page';
export {rxForm, textFieldAccessor} from './src/rxForm.page';
export {rxMisc} from './src/rxMisc.page';
export {rxNotify, rxNotification} from './src/rxNotify.page';
export {rxRadio, rxRadioAccessor} from './src/rxRadio.page';
export {rxSelect, rxSelectAccessor} from './src/rxSelect.page';

import {rxCheckbox as rxCheckboxExercise} from './src/rxCheckbox.exercise';
import {rxDatePicker as rxDatePickerExercise} from './src/rxDatePicker.exercise';
import {rxFieldName as rxFieldNameExercise} from './src/rxFieldName.exercise';
import {rxRadio as rxRadioExercise} from './src/rxRadio.exercise';
import {rxSelect as rxSelectExercise} from './src/rxSelect.exercise';

export const exercise: {
    rxCheckbox: typeof rxCheckboxExercise
    rxDatePicker: typeof rxDatePickerExercise
    rxFieldName: typeof rxFieldNameExercise
    rxRadio: typeof rxRadioExercise
    rxSelect: typeof rxSelectExercise
}