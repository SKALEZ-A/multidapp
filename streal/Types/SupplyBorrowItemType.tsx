export default interface SupplyBorrowItemType {
  tokenImage: string;
  tokenName: string;
  canBeCollateral: boolean;
  available?: string;
  walletBalance?: string;
  apyVariable: string;
  apySupply: string;
  isolated?: boolean;
  isBorrowItem?: boolean;
  id: string
}
