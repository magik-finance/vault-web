import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useState,
  VFC,
} from "react";
import { createPortal } from "react-dom";
import { usePopperTooltip } from "react-popper-tooltip";
import { CSSTransition } from "react-transition-group";

import {
  ChevronDownIcon,
  Menu,
  MenuItem,
  SelectVaultButton,
  VaultIcon,
} from "./SelectVault.styles";

interface Props {
  className?: string;
}

const useClickOutside = (ref: HTMLElement | null, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref && !ref.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

interface MenuItemProps {
  label: string;
  value: string;
  onClick: (value: string) => void;
}

const Item: VFC<MenuItemProps> = ({ label, value, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(value);
  }, [onClick, value]);

  return (
    <MenuItem type="button" onClick={handleClick}>
      {label}
    </MenuItem>
  );
};

interface Props {
  className?: string;
  options: {
    label: string;
    value: string;
  }[];
  onClick: (value: string) => void;
}

export const SelectVault: VFC<Props> = ({ className, options, onClick }) => {
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

  useClickOutside(triggerRef, onSelectVaultButtonClickOutside);

  const handleSelectVaultButtonClick = useCallback<
    MouseEventHandler<HTMLButtonElement>
  >(() => {
    setIsMenuOpen(true);
  }, []);

  return (
    <>
      <SelectVaultButton
        className={className}
        type="button"
        ref={setTriggerRef}
        onClick={handleSelectVaultButtonClick}
      >
        <VaultIcon />
        Select a vault
        <ChevronDownIcon />
      </SelectVaultButton>
      {createPortal(
        <CSSTransition
          in={isMenuOpen}
          timeout={200}
          classNames="fade"
          mountOnEnter={true}
          unmountOnExit={true}
        >
          <Menu ref={setTooltipRef} {...getTooltipProps()}>
            {options.map(({ label, value }) => (
              <Item key={value} label={label} value={value} onClick={onClick} />
            ))}
          </Menu>
        </CSSTransition>,
        document.querySelector("#popper")!
      )}
    </>
  );
};
