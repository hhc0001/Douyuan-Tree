addLayer("p", {
    name: "DP", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
      unlocked: true,
		  points: new Decimal("0"),
    }},
    color: "#4BDC13",
    requires: new Decimal("1"), // Can be a function that takes requirement increases into account
    resource: "DP", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal("1")
        if(hasUpgrade('p', 21)) mult = mult.times(upgradeEffect('p', 21))
        if(hasUpgrade('p', 22)) mult = mult.times(upgradeEffect('p', 22))
        if(hasUpgrade('p', 23)) mult = mult.times(upgradeEffect('p', 23))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal("1")
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for DP", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
      11: {
        name: "《自 然 风 光》",
        description: "婺源有美丽的自然风光，使点数乘以 2",
        cost: new Decimal("1"),
        effect() {
          return new Decimal("2")
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
      },
      12: {
        name: "《h o m o》",
        description: "人类，启动！基于 DP 加成点数",
        cost: new Decimal("5"),
        effect() {
          return player[this.layer].points.add(1).pow(0.7)
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
      },
      13: {
        name: "《环 境 改 造》",
        description: "人类的力量在此显现，基于点数加成点数",
        cost: new Decimal("20"),
        effect() {
          return Decimal.log10(player.points.add(10)).pow(2)
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
      },
      21: {
        name: "友好的环境",
        description: "环境：我感觉行了，基于点数加成 DP",
        cost: new Decimal("111"),
        effect() {
          return player.points.add(1).pow(0.15)
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
      },
      22: {
        name: "定居",
        description: "没有房子，使用窝棚，基于 DP 加成 DP",
        cost: new Decimal("2222"),
        effect() {
          return player[this.layer].points.add(1).pow(0.1)
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
      },
      23: {
        name: "房子",
        description: "出现房子，对于每一个 DU，使点数和 DP 乘以 2",
        cost: new Decimal("40000"),
        effect() {
          mult = new Decimal("1")
          multBase = new Decimal("2")
          multMult = new Decimal("1")

          if(hasUpgrade('p', 32)) {
            if(hasUpgrade('p', 33)) multBase = multBase.times(upgradeEffect('p', 32))
            else multBase = multBase.add(upgradeEffect('p', 32))
          }
          if(hasUpgrade('p', 31)) multMult = multMult.times(upgradeEffect('p', 31))

          if(hasUpgrade('p', 11)) mult = mult.times(2)
          if(hasUpgrade('p', 12)) mult = mult.times(2)
          if(hasUpgrade('p', 13)) mult = mult.times(2)
          if(hasUpgrade('p', 21)) mult = mult.times(2)
          if(hasUpgrade('p', 22)) mult = mult.times(2)
          if(hasUpgrade('p', 23)) mult = mult.times(2)
          if(hasUpgrade('p', 31)) mult = mult.times(2)
          if(hasUpgrade('p', 32)) mult = mult.times(2)
          if(hasUpgrade('p', 33)) mult = mult.times(2)
          mult = Decimal.pow(mult, multMult)
          return mult
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
      },
      31: {
        name: "村子",
        description: "村子使房子的数量增加，使 DU23 的起效数量基于 DU 数量倍增",
        cost: new Decimal("1e12"),
        effect() {
          count = new Decimal("0")
          if(hasUpgrade('p', 11)) count = count.add(1)
          if(hasUpgrade('p', 12)) count = count.add(1)
          if(hasUpgrade('p', 13)) count = count.add(1)
          if(hasUpgrade('p', 21)) count = count.add(1)
          if(hasUpgrade('p', 22)) count = count.add(1)
          if(hasUpgrade('p', 23)) count = count.add(1)
          if(hasUpgrade('p', 31)) count = count.add(1)
          if(hasUpgrade('p', 32)) count = count.add(1)
          if(hasUpgrade('p', 33)) count = count.add(1)
          return Decimal.log2(count + 2)
        },
        effectDisplay() {return "^" + format(upgradeEffect(this.layer, this.id))},
      },
      32: {
        name: "扩张",
        description: "村子吸了人之后变大变高，使 DU23 的基础基于 DP 加成",
        cost: new Decimal("1e54"),
        effect() {
          return Decimal.log10(Decimal.log10(player[this.layer].points + 10) + 10)
        },
        effectDisplay() {return "+" + format(upgradeEffect(this.layer, this.id))},
      },
      33: {
        name: "开放",
        description: "村子开放了！解锁飞机票（P），DU32 效果变为乘法",
        cost: new Decimal("1e65"),
      },
    },
})
