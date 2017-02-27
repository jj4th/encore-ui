export {rxComponentElement, AccessorPromiseString, OverrideWebdriver, Promise} from './src/rxComponent';
export {rxAccountInfo, rxAccountInfoBadge} from './src/rxAccountInfo.page';
export {rxActionMenu, rxAction} from './src/rxActionMenu.page';
export {rxAge} from './src/rxAge.page';
export {rxBreadcrumbs, rxBreadcrumb} from './src/rxBreadcrumbs.page';
export {rxBulkSelect, rxBulkSelectRow} from './src/rxBulkSelect.page';
export {rxCheckbox, rxCheckboxAccessor} from './src/rxCheckbox.page';
export {rxCharacterCount} from './src/rxCharacterCount.page';
export {rxCollapse} from './src/rxCollapse.page';
export {rxCopy} from './src/rxCopy.page';
export {rxDatePicker} from './src/rxDatePicker.page';
export {rxDiskSize} from './src/rxDiskSize.page';
export {rxFeedback} from './src/rxFeedback.page';
export {rxFieldName} from './src/rxFieldName.page';
export {rxForm, textFieldAccessor} from './src/rxForm.page';
export {rxLocalStorage} from './src/rxLocalStorage.page';
export {rxMisc} from './src/rxMisc.page';
export {rxModalAction} from './src/rxModalAction.page';
export {rxNotify, rxNotification} from './src/rxNotify.page';
export {rxRadio, rxRadioAccessor} from './src/rxRadio.page';
export {rxSelect, rxSelectAccessor} from './src/rxSelect.page';
export {Tooltip} from './src/tooltip.page';

import {rxCheckbox as rxCheckboxExercise} from './src/rxCheckbox.exercise';
import {rxCharacterCount as rxCharacterCountExercise} from './src/rxCharacterCount.exercise';
import {rxCollapse as rxCollapseExercise} from './src/rxCollapse.exercise';
import {rxCopy as rxCopyExercise} from './src/rxCopy.exercise';
import {rxDatePicker as rxDatePickerExercise} from './src/rxDatePicker.exercise';
import {rxFieldName as rxFieldNameExercise} from './src/rxFieldName.exercise';
import {rxRadio as rxRadioExercise} from './src/rxRadio.exercise';
import {rxSelect as rxSelectExercise} from './src/rxSelect.exercise';
import {rxBulkSelect as rxBulkSelectExercise} from './src/rxBulkSelect.exercise';

export const exercise: {
    rxCheckbox: typeof rxCheckboxExercise
    rxCharacterCount: typeof rxCharacterCountExercise
    rxCollapse: typeof rxCollapseExercise
    rxCopy: typeof rxCopyExercise
    rxDatePicker: typeof rxDatePickerExercise
    rxFieldName: typeof rxFieldNameExercise
    rxRadio: typeof rxRadioExercise
    rxSelect: typeof rxSelectExercise
    rxBulkSelect: typeof rxBulkSelectExercise
}