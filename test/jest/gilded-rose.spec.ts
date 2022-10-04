import { Item, GildedRose } from "@/gilded-rose";
import { readFileSync } from "fs";
import path from "path";

describe("Gilded Rose", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("fixme");
  });
});

describe("Gilded Rose Golden Master", () => {
  it("should comply to the golden_master", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 13),
    ];

    const gildedRose = new GildedRose(items);
    const days = 100;
    var output = "";

    for (let i = 0; i < days; i++) {
      output += "-------- day " + i + " --------\n";
      output += "name, sellIn, quality\n";

      for (let j = 0; j < items.length; j++) {
        const item = items[j];
        output += item.name + ", " + item.sellIn + ", " + item.quality + "\n";
      }
      output += "\n";

      gildedRose.updateQuality();
    }

    const goldenMasterPath = path.join(__dirname, "golden_output.txt");
    const goldenOutput = readFileSync(goldenMasterPath, "utf8");
    expect(output).toEqual(goldenOutput);
  });
});
