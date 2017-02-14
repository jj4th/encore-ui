export {rxComponentElement} from './src/rxComponent';
export {rxAccountInfo, rxAccountInfoBadge} from './src/rxAccountInfo.page';
export {rxActionMenu, rxAction} from './src/rxActionMenu.page';
export {rxAge} from './src/rxAge.page';
export {rxCheckbox, rxCheckboxAccessor} from './src/rxCheckbox.page';
export {rxDatePicker} from './src/rxDatePicker.page';
export {rxForm, textFieldAccessor} from './src/rxForm.page';
export {rxMisc} from './src/rxMisc.page';
export {rxNotify, rxNotification} from './src/rxNotify.page';

import {rxDatePicker as rxDatePickerExercise} from './src/rxDatePicker.exercise';

export const exercise: {
    rxDatePicker: typeof rxDatePickerExercise
}