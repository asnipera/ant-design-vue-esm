import type { GenerateConfig } from '../../generate';
import type { Locale, NullableDateType } from '../../interface';
export declare const YEAR_COL_COUNT = 3;
export declare type YearBodyProps<DateType> = {
    prefixCls: string;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    value?: NullableDateType<DateType>;
    viewDate: DateType;
    disabledDate?: (date: DateType) => boolean;
    onSelect: (value: DateType) => void;
};
declare function YearBody<DateType>(_props: YearBodyProps<DateType>): JSX.Element;
declare namespace YearBody {
    var displayName: string;
    var inheritAttrs: boolean;
}
export default YearBody;
