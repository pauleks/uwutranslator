// Feel free to add whatever you want :3

const data = {
    faces: ["＾ω＾", "(≧◡≦)", "(≧∇≦)/", "ヾ(・ω・ｏ)", ":3", "OwO", "UwU", "uwu", "owo", "qwq"],
    replacings: [
        { toReplace: /(?:r|l)/g, with: "w" },
        { toReplace: /n([aeiou])/g, with: "ny$1" },
        { toReplace: /ove/g, with: "uv" },
        { toReplace: /ame/g, with: "ayme" }
    ]
}

module.exports.uwuify = (text) => {
    return new Promise((resolve) => {
        text = text.toLowerCase();

        data.replacings.forEach((letter) => {
            text = text.replace(letter.toReplace, letter.with);
        });

        if (text[0].match(/[a-z]/i)) text = `${text[0]}-${text}`;
        if (text[text.length - 1].match(/[a-z]/i)) text += `\~\~`;
        text += ` ${data.faces[Math.floor(Math.random() * data.faces.length)]}`;

        resolve(text);
    });
}