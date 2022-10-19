import { NormalItem } from "../../app/item";

describe("item", () => {
  it("should safely decrement an item", () => {
    let item = new NormalItem("+5 Dexterity Vest", 10, 20);
    item.safeDecrement();
    expect(item.quality).toBe(19);
  });

  it("should not decrement an item unsafely", () => {
    let item = new NormalItem("+5 Dexterity Vest", 10, 0);
    item.safeDecrememt();
    expect(item.quality).toBe(0);
  });
});
