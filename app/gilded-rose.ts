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
  private readonly MAX_DAYS_TO_CONCERT = 10;
  private readonly MAX_DAYS_TO_CONCERT_2 = 5;

  isQualityBelowThreshold = (index: number): boolean =>
    this.items[index].quality < this.MAX_QUALITY;

  operateOnQuality(
    currentItemIndex: number,
    delta: number,
    predicate: (index: number) => boolean
  ): void {
    if (predicate(currentItemIndex)) {
      this.items[currentItemIndex].quality += delta;
    }
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].name == this.SULFURAS) {
        continue;
      }
      if (
        this.items[i].name != this.AGED_BRIE &&
        this.items[i].name != this.BACKSTAGE_PASS
      ) {
        if (this.items[i].quality > 0) {
          this.items[i].quality--;
        }
      } else {
        if (this.items[i].quality < this.MAX_QUALITY) {
          this.items[i].quality++;
          if (this.items[i].name == this.BACKSTAGE_PASS) {
            if (this.items[i].sellIn <= this.MAX_DAYS_TO_CONCERT) {
              // TODO: pass additional param to operateOnQuality -> this.items[currentItemIndex].quality < this.MAX_QUALITY
              this.operateOnQuality(i, 1, this.isQualityBelowThreshold);
            }
            if (this.items[i].sellIn <= this.MAX_DAYS_TO_CONCERT_2) {
              this.operateOnQuality(i, 1, this.isQualityBelowThreshold);
            }
          }
        }
      }
      this.items[i].sellIn--;

      if (this.items[i].sellIn < 0) {
        if (this.items[i].name == this.BACKSTAGE_PASS) {
          this.items[i].quality = 0;
        }

        if (this.items[i].name != this.AGED_BRIE) {
          if (this.items[i].name != this.BACKSTAGE_PASS) {
            if (this.items[i].quality > 0) {
              this.items[i].quality--;
            }
          }
        } else {
          this.operateOnQuality(i, 1, this.isQualityBelowThreshold);
        }
      }
    }

    return this.items;
  }
}
