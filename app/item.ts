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

export class NormalItem extends Item {
  constructor(name, sellIn, quality) {
    super(name, sellIn, quality);
  }

  safeDecrement() {
    if (this.quality > 0) {
      this.quality--;
    }
  }
}
