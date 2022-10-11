export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  private readonly AGED_BRIE = "Aged Brie";
  private readonly BACKSTAGE_PASS = "Backstage passes to a TAFKAL80ETC concert";
  private readonly SULFURAS = "Sulfuras, Hand of Ragnaros";

  private readonly MAX_QUALITY = 50;
  private readonly MIN_QUALITY = 0;
  private readonly TEN_DAYS_TO_CONCERT = 10;
  private readonly FIVE_DAYS_TO_CONCERT = 5;

  isQualityBelowThreshold = (item: Item): boolean =>
    item.quality < this.MAX_QUALITY;

  isQualityAboveThreshold = (item: Item): boolean =>
    item.quality > this.MIN_QUALITY;

  operateOnQuality(
    item: Item,
    delta: number,
    predicate: (item: Item) => boolean
  ): void {
    if (predicate(item)) {
      item.quality += delta;
    }
  }

  handleBackstagePass(item: Item) {
    if (item.quality < this.MAX_QUALITY) {
      item.quality++;

      if (item.sellIn <= this.TEN_DAYS_TO_CONCERT) {
        this.operateOnQuality(item, 1, this.isQualityBelowThreshold);
      }
      if (item.sellIn <= this.FIVE_DAYS_TO_CONCERT) {
        this.operateOnQuality(item, 1, this.isQualityBelowThreshold);
      }
    }
  }

  updateQuality() {
    this.items.forEach((item) => {
      switch (item.name) {
        case this.SULFURAS:
          return;

        case this.AGED_BRIE:
          this.operateOnQuality(item, 1, this.isQualityBelowThreshold);
          item.sellIn--;
          if (item.sellIn < 0) {
            this.operateOnQuality(item, 1, this.isQualityBelowThreshold);
          }
          break;

        case this.BACKSTAGE_PASS:
          this.handleBackstagePass(item);
          item.sellIn--;
          if (item.sellIn < 0) {
            item.quality = 0;
          }
          break;

        default:
          this.operateOnQuality(item, -1, this.isQualityAboveThreshold);
          item.sellIn--;
          if (item.sellIn < 0) {
            this.operateOnQuality(item, -1, this.isQualityAboveThreshold);
          }
          break;
      }
    });

    return this.items;
  }
}
