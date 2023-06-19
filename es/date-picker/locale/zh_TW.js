import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import CalendarLocale from '../../vc-picker/locale/zh_TW';
import TimePickerLocale from '../../time-picker/locale/zh_TW';
// 统一合并为完整的 Locale
var locale = {
  lang: _objectSpread({
    placeholder: '請選擇日期',
    yearPlaceholder: '請選擇年份',
    quarterPlaceholder: '請選擇季度',
    monthPlaceholder: '請選擇月份',
    weekPlaceholder: '請選擇周',
    rangePlaceholder: ['開始日期', '結束日期'],
    rangeYearPlaceholder: ['開始年份', '結束年份'],
    rangeMonthPlaceholder: ['開始月份', '結束月份'],
    rangeQuarterPlaceholder: ['開始季度', '結束季度'],
    rangeWeekPlaceholder: ['開始周', '結束周']
  }, CalendarLocale),
  timePickerLocale: _objectSpread({}, TimePickerLocale)
};
locale.lang.ok = '確 定';
// All settings at:
// https://github.com/ant-design/ant-design/blob/master/components/date-picker/locale/example.json
export default locale;