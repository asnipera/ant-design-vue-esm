import _createForOfIteratorHelper from "@babel/runtime/helpers/esm/createForOfIteratorHelper";
import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import localeData from 'dayjs/plugin/localeData';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import weekYear from 'dayjs/plugin/weekYear';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { noteOnce } from '../../vc-util/warning';
dayjs.extend(customParseFormat);
dayjs.extend(advancedFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(weekOfYear);
dayjs.extend(weekYear);
dayjs.extend(quarterOfYear);
dayjs.extend(function (_o, c) {
  // todo support Wo (ISO week)
  var proto = c.prototype;
  var oldFormat = proto.format;
  proto.format = function f(formatStr) {
    var str = (formatStr || '').replace('Wo', 'wo');
    return oldFormat.bind(this)(str);
  };
});
var localeMap = {
  // ar_EG:
  // az_AZ:
  // bg_BG:
  bn_BD: 'bn-bd',
  by_BY: 'be',
  // ca_ES:
  // cs_CZ:
  // da_DK:
  // de_DE:
  // el_GR:
  en_GB: 'en-gb',
  en_US: 'en',
  // es_ES:
  // et_EE:
  // fa_IR:
  // fi_FI:
  fr_BE: 'fr',
  fr_CA: 'fr-ca',
  // fr_FR:
  // ga_IE:
  // gl_ES:
  // he_IL:
  // hi_IN:
  // hr_HR:
  // hu_HU:
  hy_AM: 'hy-am',
  // id_ID:
  // is_IS:
  // it_IT:
  // ja_JP:
  // ka_GE:
  // kk_KZ:
  // km_KH:
  kmr_IQ: 'ku',
  // kn_IN:
  // ko_KR:
  // ku_IQ: // previous ku in antd
  // lt_LT:
  // lv_LV:
  // mk_MK:
  // ml_IN:
  // mn_MN:
  // ms_MY:
  // nb_NO:
  // ne_NP:
  nl_BE: 'nl-be',
  // nl_NL:
  // pl_PL:
  pt_BR: 'pt-br',
  // pt_PT:
  // ro_RO:
  // ru_RU:
  // sk_SK:
  // sl_SI:
  // sr_RS:
  // sv_SE:
  // ta_IN:
  // th_TH:
  // tr_TR:
  // uk_UA:
  // ur_PK:
  // vi_VN:
  zh_CN: 'zh-cn',
  zh_HK: 'zh-hk',
  zh_TW: 'zh-tw'
};
var parseLocale = function parseLocale(locale) {
  var mapLocale = localeMap[locale];
  return mapLocale || locale.split('_')[0];
};
var parseNoMatchNotice = function parseNoMatchNotice() {
  /* istanbul ignore next */
  noteOnce(false, 'Not match any format. Please help to fire a issue about this.');
};
var advancedFormatRegex = /\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|k{1,2}|S/g;
function findTargetStr(val, index, segmentation) {
  var items = _toConsumableArray(new Set(val.split(segmentation)));
  var idx = 0;
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    idx += item.length;
    if (idx > index) {
      return item;
    }
    idx += segmentation.length;
  }
}
var toDateWithValueFormat = function toDateWithValueFormat(val, valueFormat) {
  if (!val) return null;
  if (dayjs.isDayjs(val)) {
    return val;
  }
  var matchs = valueFormat.matchAll(advancedFormatRegex);
  var baseDate = dayjs(val, valueFormat);
  if (matchs === null) {
    return baseDate;
  }
  var _iterator = _createForOfIteratorHelper(matchs),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var match = _step.value;
      var origin = match[0];
      var index = match['index'];
      if (origin === 'Q') {
        var segmentation = val.slice(index - 1, index);
        var quarterStr = findTargetStr(val, index, segmentation).match(/\d+/)[0];
        baseDate = baseDate.quarter(parseInt(quarterStr));
      }
      if (origin.toLowerCase() === 'wo') {
        var _segmentation = val.slice(index - 1, index);
        var weekStr = findTargetStr(val, index, _segmentation).match(/\d+/)[0];
        baseDate = baseDate.week(parseInt(weekStr));
      }
      if (origin.toLowerCase() === 'ww') {
        baseDate = baseDate.week(parseInt(val.slice(index, index + origin.length)));
      }
      if (origin.toLowerCase() === 'w') {
        baseDate = baseDate.week(parseInt(val.slice(index, index + origin.length + 1)));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return baseDate;
};
var generateConfig = {
  // get
  getNow: function getNow() {
    return dayjs();
  },
  getFixedDate: function getFixedDate(string) {
    return dayjs(string, ['YYYY-M-DD', 'YYYY-MM-DD']);
  },
  getEndDate: function getEndDate(date) {
    return date.endOf('month');
  },
  getWeekDay: function getWeekDay(date) {
    var clone = date.locale('en');
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },
  getYear: function getYear(date) {
    return date.year();
  },
  getMonth: function getMonth(date) {
    return date.month();
  },
  getDate: function getDate(date) {
    return date.date();
  },
  getHour: function getHour(date) {
    return date.hour();
  },
  getMinute: function getMinute(date) {
    return date.minute();
  },
  getSecond: function getSecond(date) {
    return date.second();
  },
  // set
  addYear: function addYear(date, diff) {
    return date.add(diff, 'year');
  },
  addMonth: function addMonth(date, diff) {
    return date.add(diff, 'month');
  },
  addDate: function addDate(date, diff) {
    return date.add(diff, 'day');
  },
  setYear: function setYear(date, year) {
    return date.year(year);
  },
  setMonth: function setMonth(date, month) {
    return date.month(month);
  },
  setDate: function setDate(date, num) {
    return date.date(num);
  },
  setHour: function setHour(date, hour) {
    return date.hour(hour);
  },
  setMinute: function setMinute(date, minute) {
    return date.minute(minute);
  },
  setSecond: function setSecond(date, second) {
    return date.second(second);
  },
  // Compare
  isAfter: function isAfter(date1, date2) {
    return date1.isAfter(date2);
  },
  isValidate: function isValidate(date) {
    return date.isValid();
  },
  locale: {
    getWeekFirstDay: function getWeekFirstDay(locale) {
      return dayjs().locale(parseLocale(locale)).localeData().firstDayOfWeek();
    },
    getWeekFirstDate: function getWeekFirstDate(locale, date) {
      return date.locale(parseLocale(locale)).weekday(0);
    },
    getWeek: function getWeek(locale, date) {
      return date.locale(parseLocale(locale)).week();
    },
    getShortWeekDays: function getShortWeekDays(locale) {
      return dayjs().locale(parseLocale(locale)).localeData().weekdaysMin();
    },
    getShortMonths: function getShortMonths(locale) {
      return dayjs().locale(parseLocale(locale)).localeData().monthsShort();
    },
    format: function format(locale, date, _format) {
      return date.locale(parseLocale(locale)).format(_format);
    },
    parse: function parse(locale, text, formats) {
      var localeStr = parseLocale(locale);
      for (var i = 0; i < formats.length; i += 1) {
        var format = formats[i];
        var formatText = text;
        if (format.includes('wo') || format.includes('Wo')) {
          // parse Wo
          var year = formatText.split('-')[0];
          var weekStr = formatText.split('-')[1];
          var firstWeek = dayjs(year, 'YYYY').startOf('year').locale(localeStr);
          for (var j = 0; j <= 52; j += 1) {
            var nextWeek = firstWeek.add(j, 'week');
            if (nextWeek.format('Wo') === weekStr) {
              return nextWeek;
            }
          }
          parseNoMatchNotice();
          return null;
        }
        var date = dayjs(formatText, format, true).locale(localeStr);
        if (date.isValid()) {
          return date;
        }
      }
      if (!text) {
        parseNoMatchNotice();
      }
      return null;
    }
  },
  toDate: function toDate(value, valueFormat) {
    if (Array.isArray(value)) {
      return value.map(function (val) {
        return toDateWithValueFormat(val, valueFormat);
      });
    } else {
      return toDateWithValueFormat(value, valueFormat);
    }
  },
  toString: function toString(value, valueFormat) {
    if (Array.isArray(value)) {
      return value.map(function (val) {
        return dayjs.isDayjs(val) ? val.format(valueFormat) : val;
      });
    } else {
      return dayjs.isDayjs(value) ? value.format(valueFormat) : value;
    }
  }
};
export default generateConfig;