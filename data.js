const data = {
	statuses: ["with uwu faces", 'a game called "OwO what\'s this?!?"', "*notices shitpost* uwu what's this?", "@mention me to uwu-ify messages", "with s-senpai~~", "Coded by code monkeys at uwu headquawews", "Hewwo dewr~!", "Stay safe! uwu", "Stay home!", "Remember to wash your hands!"],

	// This software uses code from QuazzyWazzy/UwU-fy - see library-license.txt
	replacements: [
		[["hello", "hi"], "hewwo"],
		[["god"], "gawd"],
		[["father"], "daddy"],
		[["papa"], "papi"],
		[["mom"], "mommy"],
		[["mother"], "mommy"]
	],

	emotions: [
    	[["happy", "exciting", "excited", "wonderful", "nice", "joyful", "gleeful", "glee", "blessed", "delighted", "smile", "smiling"],
      ["＾ω＾", "（＾∀＾）", "≧ω≦", "(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "	(≧◡≦)"]],
    	[["sad", "unhappy", "depressed", "depressing", "depression", "miserable", "heartbroken", "broken-hearted"],
      ["╥﹏╥", "༼☯﹏☯༽", "(╥_╥)", "(⋟﹏⋞)", "༼ ༎ຶ ෴ ༎ຶ༽", "（>﹏<）", "（；＿；）"]],
    	[["angry", "angery", "mad", "annoyed", "annoying", "hate", "rage", "quit", "ragequit", "fuck", "fucks", "fucked", "shit", "shitty", "shits", "bullshit", "motherfucker", "triggered"],
      ["ಠ_ಠ", "⋋_⋌", "ಠ▃ಠ", "(╬ಠ益ಠ)", "(¬_¬)", "（＞μ＜＃）", "凸ಠ益ಠ)凸", "(ノಠ益ಠ)ノ彡┻━┻"]],
    	[["ez", "easy", "gg"],
      ["(⌐■_■)", "(ﾒ▼_▼)"]],
    	[["love", "luv", "heart", "affection", "passion", "cute", "kawaii", "wife", "waifu", "husband", "husbando", "hasubando"],
      ["(♥ω♥*)", "(｡♥‿♥｡)", "ღゝ◡╹)ノ♡", "（♥￫ｏ￩♥）"]],
    	[["bored", "boring", "tired", "tiring", "exhausted", "exhausting"],
      ["(￣Д￣", "（；￣д￣）", "（－－；", "（￣Ω￣）"]],
    	[["hello", "hewwo", "hi", "welcome", "youkoso"],
      ["ヾ(＾∇＾)", "( ﾟ▽ﾟ)/", "(=ﾟωﾟ)ﾉ", "(≧∇≦)/", "ヾ(・ω・ｏ)", "( ^_^)／"]],
    	[["lol", "lul", "xd", "rofl", "wofl", "lmao", "lmfao"],
      ["（ ´థ౪థ）", "( ◉◞౪◟◉)", "（ლ ^ิ౪^ิ）ლ", ";´༎ຶਊ ༎ຶ`;", "( ՞ਊ՞)"]]
],

	puntuations: [
    [".", "desu"],
    ["?", "ka"],
    ["!", "DESU"]
]
};

module.exports = data;