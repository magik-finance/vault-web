import {
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
  useRef,
  useState,
  VFC,
} from "react";

import { IconName } from "../../../components/Icon";
import {
  SelectField,
  SelectFieldButtonContentType,
  SelectFieldItemContentType,
  SelectFieldProps,
} from "../../../components/SelectField";
import { formatNumber } from "../../../utils/formatNumber";
import { minMax } from "../../../utils/minMax";

import {
  AmountInput,
  AmountWrapper,
  ChevronDownIcon,
  MaxButton,
  OptionIcon,
  OptionLabel,
} from "./CurrencySelectAndInput.styles";

export interface CurrencySelectAndInputOption {
  value: string;
  label: string;
  iconName: IconName;
  max?: number;
}

interface Props
  extends Omit<
    SelectFieldProps,
    "ItemContent" | "ButtonContent" | "options" | "onChange" | "value"
  > {
  options: CurrencySelectAndInputOption[];
  optionValue: SelectFieldProps["value"];
  amountValue: number;
  onOptionChange: SelectFieldProps["onChange"];
  onAmountChange: (amount: number) => void;
}

export const CurrencySelectAndInput: VFC<Props> = ({
  className,
  options,
  onOptionChange,
  onAmountChange,
  optionValue,
  amountValue,
  ...otherProps
}) => {
  const amountInputRef = useRef<HTMLInputElement>(null);
  const [isAmountInputShown, setIsAmountInputShown] = useState(false);
  const selectedOption = useMemo(
    () => options.find(({ value }) => optionValue === value)!,
    [options, optionValue]
  );

  const selectFieldOptions = useMemo(
    () => options.map((option) => option.value),
    [options]
  );

  const handleAmountWrapperClick: MouseEventHandler<HTMLInputElement> =
    useCallback((event) => {
      event.stopPropagation();
      setIsAmountInputShown(true);
    }, []);

  const handleAmountInputClick: MouseEventHandler<HTMLInputElement> =
    useCallback((event) => {
      event.stopPropagation();
    }, []);

  const handleAmountInputBlur: FocusEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        console.log(event?.target.value);
        const value = parseFloat(event?.target.value);
        onAmountChange(
          Number.isNaN(value) ? 0 : minMax(value, 0, selectedOption.max)
        );
        setIsAmountInputShown(false);
      },
      [onAmountChange, selectedOption.max]
    );

  const handleAmountInputKeyDown: KeyboardEventHandler<HTMLInputElement> =
    useCallback((event) => {
      if (amountInputRef.current && event.key === "Enter") {
        amountInputRef.current.blur();
      }
    }, []);

  const handleMaxButtonClick: MouseEventHandler<HTMLButtonElement> =
    useCallback(
      (event) => {
        event.stopPropagation();
        if (typeof selectedOption.max !== "number") return;

        onAmountChange(selectedOption.max);
      },
      [onAmountChange, selectedOption]
    );

  const handleOptionChange = useCallback(
    (newOptionValue: string) => {
      onOptionChange(newOptionValue);
      onAmountChange(0);
    },
    [onOptionChange, onAmountChange]
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
            <OptionLabel>{option.label}</OptionLabel>
            <ChevronDownIcon />
            {isAmountInputShown ? (
              <AmountInput
                autoFocus
                ref={amountInputRef}
                defaultValue={amountValue}
                onClick={handleAmountInputClick}
                onBlur={handleAmountInputBlur}
                onKeyDown={handleAmountInputKeyDown}
              />
            ) : (
              <AmountWrapper onClick={handleAmountWrapperClick}>
                {formatNumber(amountValue)}
              </AmountWrapper>
            )}
            {typeof selectedOption.max === "number" ? (
              <MaxButton
                onClick={handleMaxButtonClick}
                type="button"
                title="Set amount to max possible"
              >
                MAX
              </MaxButton>
            ) : null}
          </>
        );
      },
    [
      options,
      isAmountInputShown,
      amountValue,
      selectedOption.max,
      handleAmountWrapperClick,
      handleAmountInputClick,
      handleAmountInputBlur,
      handleAmountInputKeyDown,
      handleMaxButtonClick,
    ]
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
            <OptionLabel>{option.label}</OptionLabel>
          </>
        );
      },
    [options]
  );

  return (
    <SelectField
      className={className}
      options={selectFieldOptions}
      onChange={handleOptionChange}
      ButtonContent={ButtonContent}
      ItemContent={ItemContent}
      value={optionValue}
      {...otherProps}
    />
  );
};
