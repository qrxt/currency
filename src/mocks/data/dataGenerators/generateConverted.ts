export function generateConverted(amount: string) {
  return {
    date: "2022-10-31",
    info: {
      rate: 61.801083,
      timestamp: 1667236803,
    },
    query: {
      amount: 5,
      from: "USD",
      to: "RUB",
    },
    result: Number(amount) * (60 + Math.random()),
    success: true,
  };
}
