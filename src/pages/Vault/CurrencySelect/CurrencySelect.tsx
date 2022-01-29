import { useMemo, VFC } from "react";

import { IconName } from "../../../components/Icon";
import {
  SelectField,
  SelectFieldButtonContentType,
  SelectFieldItemContentType,
  SelectFieldProps,
} from "../../../components/SelectField";

import {
  AmountLabelWrapper,
  AmountWrapper,
  ChevronDownIcon,
  OptionIcon,
} from "./CurrencySelect.styles";

export interface CurrencySelectOption {
  value: string;
  label: string;
  iconName: IconName;
  amount?: string;
  amountLabel?: string;
}
interface Props
  extends Omit<SelectFieldProps, "ItemContent" | "ButtonContent" | "options"> {
  options: CurrencySelectOption[];
}

export const CurrencySelect: VFC<Props> = ({
  className,
  options,
  onChange,
  value,
  ...otherProps
}) => {
  const selectFieldOptions = useMemo(
    () => options.map((option) => option.value),
    [options]
  );

  const ButtonContent: SelectFieldButtonContentType = useMemo(
    () =>
      ({ value }) => {
        const option = options.find(
          (someOption) => someOption.value === value
        )!;

        return (
          <>
            <OptionIcon type={option.iconName} />
            {option.label}
            <ChevronDownIcon />
            {option.amount ? (
              <>
                <AmountWrapper>{option.amount}</AmountWrapper>
                {option.amountLabel ? (
                  <AmountLabelWrapper>{option.amountLabel}</AmountLabelWrapper>
                ) : null}
              </>
            ) : null}
          </>
        );
      },
    [options]
  );

  const ItemContent: SelectFieldItemContentType = useMemo(
    () =>
      ({ value }) => {
        const option = options.find(
          (someOption) => someOption.value === value
        )!;

        return (
          <>
            <OptionIcon type={option.iconName} />
            {option.label}
            {option.amount ? (
              <>
                <AmountWrapper>{option.amount}</AmountWrapper>
                {option.amountLabel ? (
                  <AmountLabelWrapper>{option.amountLabel}</AmountLabelWrapper>
                ) : null}
              </>
            ) : null}
          </>
        );
      },
    [options]
  );

  return (
    <SelectField
      className={className}
      options={selectFieldOptions}
      onChange={onChange}
      ButtonContent={ButtonContent}
      ItemContent={ItemContent}
      value={value}
      {...otherProps}
    />
  );
};
