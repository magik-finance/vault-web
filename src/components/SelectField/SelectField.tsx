import { MouseEventHandler, useCallback, useState, VFC } from "react";
import { createPortal } from "react-dom";
import { usePopperTooltip } from "react-popper-tooltip";
import { CSSTransition } from "react-transition-group";

import { Menu, MenuItem, SelectFieldButton } from "./SelectField.styles";
import { useOnClickOutside } from "./use-on-click-outside";

export type SelectFieldButtonContentType = VFC<{ value: string }>;
export type SelectFieldItemContentType = VFC<{ value: string }>;

interface MenuItemProps {
  value: string;
  onClick: (value: string) => void;
  ItemContent: SelectFieldItemContentType;
}

const Item: VFC<MenuItemProps> = ({ value, onClick, ItemContent }) => {
  const handleClick = useCallback(() => {
    onClick(value);
  }, [onClick, value]);

  return (
    <MenuItem type="button" onClick={handleClick}>
      <ItemContent value={value} />
    </MenuItem>
  );
};

export interface SelectFieldProps {
  className?: string;
  ButtonContent: SelectFieldButtonContentType;
  ItemContent: SelectFieldItemContentType;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

export const SelectField: VFC<SelectFieldProps> = ({
  className,
  ButtonContent,
  ItemContent,
  value,
  options,
  onChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { getTooltipProps, setTooltipRef, setTriggerRef, triggerRef } =
    usePopperTooltip({
      trigger: "click",
      placement: "bottom",
      visible: isMenuOpen,
    });

  const onSelectVaultButtonClickOutside = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  useOnClickOutside(triggerRef, onSelectVaultButtonClickOutside);

  const handleSelectVaultButtonClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    setIsMenuOpen(true);
  }, []);

  return (
    <>
      <SelectFieldButton
        className={className}
        type="button"
        ref={setTriggerRef}
        onClick={handleSelectVaultButtonClick}
      >
        <ButtonContent value={value} />
      </SelectFieldButton>
      {createPortal(
        <CSSTransition
          in={isMenuOpen}
          timeout={200}
          classNames="fade"
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <Menu ref={setTooltipRef} {...getTooltipProps()}>
            {options.map((optionValue) => (
              <Item
                key={value}
                value={optionValue}
                onClick={onChange}
                ItemContent={ItemContent}
              />
            ))}
          </Menu>
        </CSSTransition>,
        document.querySelector("#popper")!
      )}
    </>
  );
};
