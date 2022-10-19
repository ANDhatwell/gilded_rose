import { Item } from "./item";

enum ItemType {
  SULFURAS = "Sulfuras, Hand of Ragnaros",
  AGED_BRIE = "Aged Brie",
  BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert",
}

// TODO create Item factory so that if we want to add conjured items, we want to follow open/closed principle
// call item factory on array of items passed into GR constructor.

// OR have factory in Item constructor?

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private readonly MAX_QUALITY = 50;
  private readonly MIN_QUALITY = 0;
  private readonly TEN_DAYS_TO_CONCERT = 10;
  private readonly FIVE_DAYS_TO_CONCERT = 5;

  isQualityBelowThreshold = (item: Item): boolean =>
    item.quality < this.MAX_QUALITY;

  isQualityAboveThreshold = (item: Item): boolean =>
    item.quality > this.MIN_QUALITY;

  safeIncrement(item: Item) {
    if (this.isQualityBelowThreshold(item)) {
      item.quality++;
    }
  }

  safeDecrement(item: Item) {
    if (this.isQualityAboveThreshold(item)) {
      item.quality--;
    }
  }

  handleBackstagePass(item: Item) {
    if (item.quality < this.MAX_QUALITY) {
      item.quality++;

      if (item.sellIn <= this.TEN_DAYS_TO_CONCERT) {
        this.safeIncrement(item);
      }
      if (item.sellIn <= this.FIVE_DAYS_TO_CONCERT) {
        this.safeIncrement(item);
      }
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case ItemType.SULFURAS:
          return;

        case ItemType.AGED_BRIE:
          this.safeIncrement(item);
          item.sellIn--;
          if (item.sellIn < 0) {
            this.safeIncrement(item);
          }
          break;

        case ItemType.BACKSTAGE_PASS:
          this.handleBackstagePass(item);
          item.sellIn--;
          if (item.sellIn < 0) {
            item.quality = 0;
          }
          break;

        default:
          this.safeDecrement(item);
          item.sellIn--;
          if (item.sellIn < 0) {
            this.safeDecrement(item);
          }
          break;
      }
    });

    return this.items;
  }
}
