var done = arguments[arguments.length - 1];
var jsonData = arguments[0];
var url = arguments[1];
var csrf = arguments[2];

var params = new URLSearchParams();
for (const key in jsonData) {
  params.append(key, jsonData[key]);
}

fetch(url, {
  headers: {
    "csrf-prevention-token": csrf,
    "Content-Type": "application/x-www-form-urlencoded"
  },
  body: params.toString(),
  method: "POST",
})
  .then(r => {
    r.text().then(txt => {
        try {
            var v = JSON.parse(txt);
            done([r.status, v]);
        } catch (e) {
            done([r.status, {error: "JSON parse error", details: e.toString(), body: txt}]);
        }
    });
  })
  .catch(e => done([0, {error: "Fetch failed", details: e.toString()}]));