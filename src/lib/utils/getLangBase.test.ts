import getLangBase from "./getLangBase";

describe("getLangBase", () => {
  test("Should get lang base correctly", () => {
    expect(getLangBase("ru-RU")).toBe("ru");
    expect(getLangBase("ru")).toBe("ru");

    expect(getLangBase("en-US")).toBe("en");
    expect(getLangBase("en")).toBe("en");
  });
});
