import { useMemo, VFC } from "react";

import {
  SelectField,
  SelectFieldButtonContentType,
  SelectFieldItemContentType,
  SelectFieldProps,
} from "../../../components/SelectField";

import { ChevronDownIcon, VaultIcon } from "./SelectVault.styles";

interface Option {
  value: string;
  label: string;
}
interface Props
  extends Omit<SelectFieldProps, "ItemContent" | "ButtonContent" | "options"> {
  options: Option[];
}

export const SelectVault: VFC<Props> = ({
  className,
  options,
  onChange,
  value,
}) => {
  const selectedOption = useMemo(
    () => options.find((someOption) => someOption.value === value)!,
    [options, value]
  );

  const selectFieldOptions = useMemo(
    () => options.map((option) => option.value),
    [options]
  );

  const ButtonContent: SelectFieldButtonContentType = useMemo(
    () =>
      ({ value }) =>
        (
          <>
            <VaultIcon />
            {selectedOption.label}
            <ChevronDownIcon />
          </>
        ),
    [selectedOption]
  );

  const ItemContent: SelectFieldItemContentType = useMemo(
    () =>
      ({ value }) => {
        const option = options.find(
          (someOption) => someOption.value === value
        )!;

        return <>{option.label}</>;
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
    />
  );
};
