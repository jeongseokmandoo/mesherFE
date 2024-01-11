export type TokenID =
  | "ethereum"
  | "tether"
  | "usd-coin"
  | "dai"
  | "aave"
  | "bitcoin"
  | "axie-infinity"
  | "compound-coin"
  | "curve-dao-token"
  | "ethereum-name-service";
export type TokenPrice = {
  usd: number;
};
export type TokenPriceData = Record<TokenID, TokenPrice>;

export const TOKENS: {
  name: string;
  id: TokenID;
}[] = [
  { name: "ETH", id: "ethereum" },
  { name: "USDT", id: "tether" },
  { name: "USDC", id: "usd-coin" },
  { name: "DAI", id: "dai" },
  { name: "AAVE", id: "aave" },
  { name: "WBTC", id: "bitcoin" },
  { name: "AXS", id: "axie-infinity" },
  { name: "COMP", id: "compound-coin" },
  { name: "CRV", id: "curve-dao-token" },
  { name: "ENS", id: "ethereum-name-service" },
];
