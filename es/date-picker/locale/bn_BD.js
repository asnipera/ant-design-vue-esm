import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import CalendarLocale from '../../vc-picker/locale/bn_BD';
import TimePickerLocale from '../../time-picker/locale/bn_BD';
// Merge into a locale object
var locale = {
  lang: _objectSpread({
    placeholder: 'তারিখ নির্বাচন',
    yearPlaceholder: 'বছর নির্বাচন',
    quarterPlaceholder: 'কোয়ার্টার নির্বাচন',
    monthPlaceholder: 'মাস নির্বাচন',
    weekPlaceholder: 'সপ্তাহ নির্বাচন',
    rangePlaceholder: ['শুরুর তারিখ', 'শেষ তারিখ'],
    rangeYearPlaceholder: ['শুরুর বছর', 'শেষ বছর'],
    rangeMonthPlaceholder: ['শুরুর মাস', 'শেষ মাস'],
    rangeWeekPlaceholder: ['শুরুর সপ্তাহ', 'শেষ সপ্তাহ']
  }, CalendarLocale),
  timePickerLocale: _objectSpread({}, TimePickerLocale)
};
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;