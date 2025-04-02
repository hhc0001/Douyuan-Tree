addLayer("p", {
    name: "DP", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "DP", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "d", description: "D: Reset for DP", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    upgrades: {
      11: {
        name: "《自 然 风 光》",
        description: "使点数乘以 2",
        cost: new Decimal(1),
        effect() {
          return new Decimal(2)
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
      },
      12: {
        name: "《h o m o》",
        description: "基于 DP 加成点数",
        cost: new Decimal(5),
        effect() {
          return player[this.layer].points.add(1).pow(0.6)
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
      },
      13: {
        name: "《环 境 改 造》",
        description: "基于点数加成点数",
        cost: new Decimal(50),
        effect() {
          return Decimal.log10(player.points.add(10))
        },
        effectDisplay() {return format(upgradeEffect(this.layer, this.id)) + "x"},
      }
    },
})
