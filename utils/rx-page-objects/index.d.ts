export {rxComponentElement} from './src/rxComponent';
export {rxAccountInfo, rxAccountInfoBadge} from './src/rxAccountInfo.page';
export {rxDatePicker} from './src/rxDatePicker.page';

import {rxDatePicker as rxDatePickerExercise} from './src/rxDatePicker.exercise';

export const exercise: {
    rxDatePicker: typeof rxDatePickerExercise
}