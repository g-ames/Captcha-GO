// ＭＲ　ＭＩＤＤＬＥＴＯＮ　－－　ｔｈｅ　ｇａｍｅ！！！

window.speechSynthesis.getVoices() // for some reason this allows the voices to load later...?

const IS_FIREFOX = navigator.userAgent.toLowerCase().includes('firefox');
var MT_VOICE = 23;
// const MT_VOICE = 15;

var middletonianDescriptions = [
    "So the first problem we'll be looking at is '[PROBLEM]'. [SOLUTION]",
    "The following is our problem: '[PROBLEM]'. Remember guys, try to cook. [SOLUTION]",
    "'[PROBLEM]'. [SOLUTION]"
];

function genN(num) {
    var number = Math.round(Math.random() * num);
    if (number == 1) { return ''; }
    return `${Math.floor(Math.random() * 4) == 2 ? "-" : "+"}${number.toString()}`;
}

function generatePolynomial() {
    var problems = [
        `${genN(10)}`,
        `${genN(10)}x^3 + ${genN(10)}x^2 + ${genN(10)}`,
        `${genN(10)}x^4 + ${genN(10)}x^3 + ${genN(10)}`
    ];

    return problems[Math.floor(Math.random() * problems.length)];
}

function generateProblem() {
    var problem = {};

    problem.solution = "";
    problem.text = "...";

    var problemType = Math.floor(Math.random() * 2);

    if (problemType == 0) {
        problem.mode += "polynomial-";

        var polynomialType = Math.floor(Math.random() * 1);
        if (polynomialType == 0) {
            problem.mode += "summation";
            problem.text = `Find the sum of: (${generatePolynomial()}) + (${generatePolynomial()})`;
        } else if (polynomialType == 1) {
            problem.mode += "multiplication";
            problem.text = `Multiply the two polynomials: (${generatePolynomial()})(${generatePolynomial()})`;
        }
    } else if (problemType == 1) {
        problem.mode += "radicals";
    }

    problem.text = problem.text.replaceAll("  ", " ").replaceAll("( ", "(").replaceAll(" )", ")").replaceAll("+ +", "+").replaceAll("(+", "(").replaceAll("+)", ")");

    return problem;
}

function middletonize(problem) {
    var desc = middletonianDescriptions[Math.floor(Math.random() * middletonianDescriptions.length)];
    var solution = "";

    if (problem.mode.includes("polynomial")) {
        if (!problem.text.includes("^")) {
            solution += `This problem is very simple because there are no exponents, so we won't have to deal with any of that. `;
        } else {
            solution += `And so we can start by making sure that all of the like terms are in order. This means that the exponent x squared would come before x which would also come before any constants. `;
        }

        if (problem.mode.includes("summation")) {
            if (!problem.text.includes("^")) {
                solution += "Mr Middleton is now angry due to the problem's simplicity. "
            }

            solution += `All we have to do is add what we have together, and so to do that we take the like terms are added together: 4x^2 would get added to x^2, for example. `;
        }
    } else {
        solution += "MR MIDDLETON DOES NOT UNDERSTAND THIS PROBLEM. DESTRUCTION IMMINENT."
    }

    solution += `${" ".repeat(50)}${groomer.generate()}`

    return `${desc.replaceAll("[PROBLEM]", problem.text).replaceAll("[SOLUTION]", solution)}`;
}

function middletonSays(txt) {
    var sentences = txt.split(".");
    var sentenceIndex = 0;

    console.log(sentences);

    function nextSentence() {
        console.log("NCTX");

        if (typeof sentences[sentenceIndex] == "undefined") {
            return;
        }

        sentenceIndex++;

        let currentSentence = sentences[sentenceIndex];
        if (!IS_FIREFOX) {
            window.speechSynthesis.cancel();
            if (currentSentence == "") { nextSentence(); }
            MT_VOICE = Math.floor(Math.random() * 25);
            console.log(currentSentence)
            var utterance = new SpeechSynthesisUtterance(currentSentence);

            // utterThis.pitch = 1;
            // utterThis.rate = rate.value;

            utterance.voice = window.speechSynthesis.getVoices()[MT_VOICE];
            utterance.pitch = 1;
            utterance.rate = 1;

            utterance.onend = function () {
                console.log("MR MIDDLETON HAS FINISHED SPEAKING.")
                nextSentence();
            }

            utterance.onboundary = function () {
                console.log("BOUNDARY!");
            }

            utterance.onerror = function (e) {
                console.log(e)
                console.log("MIDDLETON TTS ERROR!");
                if (e.error == "interrupted") {
                    return;
                }
                nextSentence();
            }

            utterance.onstart = function () {
                console.log("MIDDLETON SPEECH STARTED.");
            }

            window.speechSynthesis.speak(utterance);
        }
    }

    nextSentence();
}

middletonSays("Unusual behavior has been detected from your IP. Please verify that you are not a robot.")

var gobigstate = "There appears to be an error Please refresh the page to fix.";

function goBigOrGoHome() {
    middletonSays(`.${gobigstate}`)
}

var captchagos = {};

// 2 then 7 then 8

var captchagoshtml = `<div style="width: min-content; height: fit-content; background-color: white; border: solid 1px #E9E9E9; padding-bottom: 0px; font-family: Verdana, Geneva, Tahoma, sans-serif;">
<div style="margin: 10px; top: 10px; left: 10px; width: 400px; height: 20%; background-color: #51ABFF; min-height: 100px; color: white; padding-left: 20px; padding-top: 20px;">
    Select all images with
    <h1 style="height: 10px; margin-top: 1px;">{FIND}</h1>
</div>
<div style="height: 7px;"></div>
<div style="width: 100%; height: fit-content;">
{IMAGES}
</div>
<div style="height: 10px;"></div>
<div style="border-color: #E9E9E9; background-color: #E9E9E9; height: 1px; width: 100%;"></div>
<div style="width: 100%; height: fit-content; display: flex; flex-direction: row; flex-wrap: nowrap;">
    <div style="padding: 10px; width: fit-content;">
        <img src="refresh.svg" style="width: 38px; height: 38px; transform: rotate(180deg);"></img>
        <img src="listen.svg" style="width: 38px; height: 38px;" onclick="goBigOrGoHome();"></img>
        <img src="info.svg" style="width: 38px; height: 38px;"></img>
    </div>
    <button style="width: 30%; background-color: #51ABFF; color: white; border-radius: 3px; border: none; height: 50px; margin-top: 5px; margin-left: 35%;">VERIFY</button>
</div>
</div>`;

var imageFrame = `<img style="width: calc(30%) ; aspect-ratio: 1/1; margin-left: 10px; margin-bottom: 10px; object-fit: cover; object-position: 50% 50%;" src="{SOURCE}"></img>`;

const compareArrays = (a, b) => {
    return a.toString() === b.toString();
};

function createcaptchago(find, images, targets, oncorrect) {
    var rendered = "";

    targets = targets.filter(xt => images.includes(xt));

    for (var i = 0; i < images.length; i++) {
        rendered += imageFrame.replaceAll("{SOURCE}", images[i]);
    }

    var html = captchagoshtml.replace("{IMAGES}", rendered).replace("{FIND}", find);
    var div = document.createElement("div");

    gobigstate = `Select all images with. ${find}. ${find}. ${find.toLocaleLowerCase().replace("monkeys", "ACH ACH ACH ACH ACH A")}.`

    div.innerHTML = html;

    var selectedImages = [];

    Array.from(div.children[0].children[2].children).forEach(img => {
        img.style.transition = "all 0.1s";
        img.onclick = function () {
            selectedImages = selectedImages.filter(ximg => {
                return ximg != img.getAttribute("src");
            });

            if (img.style.width == "25%") {
                img.style.width = "30%";
                img.style.marginBottom = "10px";
                img.style.marginLeft = "10px";
                img.style.marginTop = "";
                img.style.marginRight = "";
            } else {
                selectedImages.push(img.getAttribute("src"));
                img.style.width = "25%";
                img.style.marginBottom = "calc(10px + 2.5%)";
                img.style.marginLeft = "calc(10px + 2.5%)";
                img.style.marginTop = "2.5%";
                img.style.marginRight = "2.5%";
            }
        }
    });

    div.children[0].children[5].children[1].onclick = function () {
        // console.log(selectedImages)

        for (var i = 0; i < selectedImages.length; i++) {
            if (!targets.includes(selectedImages[i])) {
                return;
            }
        }

        var targ = [...new Set(targets)];
        var filt = targ.filter(xt => [...new Set(selectedImages)].includes(xt))
        var correct = filt.length == targ.length;
        // console.log(targ, filt, correct)
        if (correct) {
            // console.log(oncorrect)
            oncorrect();
        }
    }

    return div;
}

class CaptchaGroup {
    constructor(name, items) {
        this.name = name;
        this.items = items;
    }

    push(item) {
        this.items.push(item);
    }
}

Array.prototype.repeat = function repeat(count) {
    let output = this;
    while (--count) {
        output = output.concat(this);
    }
    return output;
};

Array.prototype.shuffle = function shuffle(array) {
    for (let i = this.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
};

function createCaptchaOnGroups(group1, group2, oncorrect) {
    // if(group1 == group2) {
    //     return "The two groups were the same, cannot compare.";
    // }

    if ((Math.random() * 100) > 50) {
        var temp = group1;
        group1 = group2;
        group2 = temp;
    }

    var pid = (Math.random() * 437979018242738);

    captchagos[pid] = function (x) {
        console.log("CLICK", x);
    }

    var images = group1.items.concat(group2.items).repeat(10).shuffle().splice(0, 9);

    return createcaptchago(
        group1.name,
        images,
        group1.items,
        oncorrect
    );
}