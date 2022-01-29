import styled from "styled-components";

import { CurrencySelect } from "../CurrencySelect";
import { VaultSelect } from "../VaultSelect";

export const SelectCollateralField = styled(CurrencySelect).attrs({
  buttonWidth: "100%",
  menuWidth: "617px",
})`
  margin-top: 54px;
`;

export const SelectCollateralDescription = styled.p`
  font-weight: 500;
  margin-top: 12px;
  color: ${({ theme }) => theme.colors.fadedOutFont};
`;
export const SelectCollateralTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-top: 40px;
`;

export const StyledVaultSelect = styled(VaultSelect).attrs({
  buttonWidth: "350px",
  menuWidth: "350px",
})`
  margin-top: 24px;
`;
