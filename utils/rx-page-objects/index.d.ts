export {rxComponentElement} from './src/rxComponent';
export {rxAccountInfo, rxAccountInfoBadge} from './src/rxAccountInfo.page';
export {rxActionMenu, rxAction} from './src/rxActionMenu.page';
export {rxDatePicker} from './src/rxDatePicker.page';
export {rxMisc} from './src/rxMisc.page';
export {rxNotify, rxNotification} from './src/rxNotify.page';

import {rxDatePicker as rxDatePickerExercise} from './src/rxDatePicker.exercise';

export const exercise: {
    rxDatePicker: typeof rxDatePickerExercise
}