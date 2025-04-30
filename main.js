function extractThumbnails(metadata) {
    let thumbs = [];
    metadata["suggested_searches"].forEach(element => {
        thumbs.push(element["thumbnail"]);
    });
    return thumbs;
}

async function fullSearch(str) {
    let JSON = await (await fetch(`https://serpapi.com/search.json?q=${encodeURIComponent(str)}&engine=google_images&ijn=0`)).json();
    return extractThumbnails(JSON);
}

var bananas = new CaptchaGroup("Bananas");

var streets = new CaptchaGroup("Streets", [
    "streets/1.jpg", 
    "streets/2.jpg",
    "streets/3.jpg", 
    "streets/4.jpg",
    "streets/5.jpg", 
    "streets/6.jpg",
]);

var femboys = new CaptchaGroup("Femboys", [
    "femboys/testimage.jpg",
]);

var franz = new CaptchaGroup("Franz Ferdinand", [
    "franz/1.jpg",
    "franz/2.avif",
    "franz/3.jpg"
]);

var monkeys = new CaptchaGroup("Monkeys", [
    "monkeys/1.jpg",
    "monkeys/2.jpg",
    "monkeys/3.jpg",
    "monkeys/4.jpg",
    "monkeys/black/1.jpg",
    "monkeys/black/2.webp",
    "monkeys/black/3.webp",
    "monkeys/black/4.jpg",
    "monkeys/black/5.jpg"
]);

var whitepeople = new CaptchaGroup("Civil People", [
    "white/10.jpg",
    "white/11.jpg",
    "white/12.jpg",
    "white/13.jpg"
]);

var groups = [streets, femboys, franz, whitepeople, monkeys];

function newcap() {
    var nowcap = createCaptchaOnGroups(groups.shuffle()[0], groups.shuffle()[0], function() {
        nowcap.remove();
        newcap();
    });
    
    document.body.appendChild(nowcap);
}

newcap();