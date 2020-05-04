const faces = ["(・`ω´・)", ";;w;;", "owo", "UwU", ">w<", "^w^", "✧w✧", "♥w♥", "(˘³˘)", "(。U⁄ ⁄ω⁄ ⁄ U。)", "(ᵘʷᵘ)", "(ᵕᴗ ᵕ⁎)", "uwU", "◔w◔", "⓪w⓪", "‿︵𝓇𝒶𝓌𝓇‿︵ ʘwʘ", "øwø", "ÓwÓ", "ÕwÕ", "@w@", "ᅌwᅌ", "ʘwʘ", "(✿◠‿◠)", "(●´ω｀●)", "(づ｡◕‿‿◕｡)づ", "≧◡≦", "(◡‿◡✿)", "(\*^ -^\*)", "(∪ ◡ ∪)", "(✿◠‿◠)", "╰(◡‿◡✿╰)", "(ﾉ◕ヮ◕)ﾉ\*:･ﾟ✧", "(￣ｰ￣)", "ヽ(゜∇゜)ノ", "(◕ω◕✿)", "(〃^∇^)ﾉ", "(\´｡• ᵕ •｡`)", "ヽ(>∀<☆)ノ", "ヽ(\*・ω・)ﾉ", "☆ ～('▽^人)", "(´ ω \`♡)", "(๑˃ᴗ˂)ﻭ", "( ´ ▽ \` ).｡ｏ♡", "╰(\*´︶`\*)╯♡", "ヽ(♡‿♡)ノ", "( ´ ∀ `)ノ～ ♡", "♡ ～('▽^人)", "( ´ ▽ \` ).｡ｏ♡", "Σ>―(〃°ω°〃)♡→", "(´,,•ω•,,)♡", "( ˘⌣˘)♡(˘⌣˘ )", "(„ಡωಡ„)", "(ノ\*°▽°\*)", "(｡･ω･｡)ﾉ♡", "(=^･ω･^=)", "╰(◡‿◡✿╰)", "(´･ω･\`)", "(=^-ω-^=)", "ヽ(=^･ω･^=)丿", "ʚ(\*´꒳\`\*)ɞ", "(´♡ω♡\`)", "★~(◡﹏◕✿)", "★~(◡ω◕✿)", "★~(◡﹏◡✿)", "★~(◠︿⊙✿)", "｡◕ ‿ ◕｡", "(◠︿◠✿)"];
const statuses = ["with uwu faces", 'a game called "OwO what\'s this?!?"', "*notices shitpost* uwu what's this?", "@mention me to uwu-ify messages", "with s-senpai~~", "Coded by code monkeys at uwu headquawews", "Hewwo dewr~!", "Stay safe! uwu", "Stay home!", "Remember to wash your hands!"];

// This software uses code from QuazzyWazzy/UwU-fy - see library-license.txt
const replacements = [
	[["hello"], "hewwo"],
	[["cute"], "kawaii"],
	[["god"], "gawd"],
	[["father"], "daddy"],
	[["papa"], "papi"],
	[["mom"], "mommy"],
	[["mother"], "mommy"]
];

const emotions = [
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
];

const puntuations = [
    [".", "desu"],
    ["?", "ka"],
    ["!", "DESU"]
];