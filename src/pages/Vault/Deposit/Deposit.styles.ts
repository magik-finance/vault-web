import styled from "styled-components";

import { SelectVault } from "../SelectVault";

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

export const StyledSelectVault = styled(SelectVault)`
  margin-top: 24px;
`;
