### Financial Math

1. gross sales + refunds + discounts = net sales
2. net sales + service fees + exchange credit = gross revenue
3. gross revenue + org fees + org taxes = net revenue
4. net revenue + adjustments = advance/settlement amount

export const PAYMENT_TYPE_OPTIONS_MAP = {
  CASH: {
    id: 1,
    name: t("Cash"),
    bulkScanPermitted: true,
  },
  CREDIT: {
    id: 2,
    name: t("Card"),
    bulkScanPermitted: false,
  },
  INTERAC: {
    id: 3,
    name: t("Interac Online"),
    bulkScanPermitted: false,
  },
  COMPLIMENTARY: {
    id: 4,
    name: t("Complimentary"),
    bulkScanPermitted: true,
  },
  FREE: {
    id: 5,
    name: t("Free"),
    bulkScanPermitted: false,
  },
  BUNDLED: {
    id: 6,
    name: t("Bundled"),
    bulkScanPermitted: false,
  },
  TRANSFERRED: {
    id: 7,
    name: t("Transferred"),
    bulkScanPermitted: false,
  },
  OTHER: {
    id: 9,
    name: t("Other"),
    bulkScanPermitted: false,
  },
  PAYMENT_PLAN: {
    id: 10,
    name: t("Payment Plan"),
    bulkScanPermitted: false,
  },
  USER_CREDIT: {
    id: 11,
    name: t("User Credit"),
    bulkScanPermitted: false,
  },
  EXCHANGE_CREDIT: {
    id: 12,
    name: t("Exchange Credit"),
    bulkScanPermitted: false,
  },
  AFTERPAY: {
    id: 13,
    name: "Afterpay",
    bulkScanPermitted: false,
    minAmount: AFTERPAY_MIN,
    maxAmount: AFTERPAY_MAX,
  },
  AFFIRM: {
    id: 14,
    name: "Affirm",
    bulkScanPermitted: false,
    minAmount: AFFIRM_MIN,
    maxAmount: AFFIRM_MAX,
  },
  AUTO_GENERATED: {
    id: 15,
    name: "Auto Generated",
    bulkScanPermitted: false,
  },
} as const;

