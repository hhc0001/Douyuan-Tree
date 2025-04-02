let modInfo = {
	name: "The Douyuan Tree",
	author: "hhc0001",
	pointsName: "",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (1), // Used for hard resets and new players
	offlineLimit: 100,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "DP 1",
}

let changelog = `
  <h1>更新日志：</h1><br>
	<h3>v0.1</h3><br>
	  - 加入了 DP, DU11、12、13、21<br>
	<br>
	<h3>v0.0</h3><br>
		- 初始版本，没有更新`

let winText = `好吧，到此为止了，但是还会有更多......`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal("0")

	let gain = new Decimal("1")
	if(hasUpgrade('p', 11)) gain = gain.times(upgradeEffect('p', 11))
	if(hasUpgrade('p', 12)) gain = gain.times(upgradeEffect('p', 12))
	if(hasUpgrade('p', 13)) gain = gain.times(upgradeEffect('p', 13))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("1000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}