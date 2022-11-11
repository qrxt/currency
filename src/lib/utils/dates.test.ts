import { formatDate, getNDaysAgo } from "./dates";

describe("formatDate", () => {
  test("should format dates correctly", () => {
    const date = new Date("December 17, 1995");
    const actual = formatDate(date);
    const expected = "1995-12-17";

    expect(actual).toBe(expected);
  });

  test("should add leading zero if month or day are less than 10 ", () => {
    const date = new Date("July 8, 1995");
    const actual = formatDate(date);
    const expected = "1995-07-08";

    expect(actual).toBe(expected);
  });
});

describe("getNDaysAgo", () => {
  test("should return correct date", () => {
    const date = new Date("November 3, 2022");
    const dateThreeDaysAgo = new Date("October 31, 2022");

    expect(getNDaysAgo(3, date)).toEqual(dateThreeDaysAgo);
  });
});
