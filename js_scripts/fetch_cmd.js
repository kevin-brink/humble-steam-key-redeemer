var done = arguments[arguments.length - 1];
var jsonData = arguments[0];
var url = arguments[1];
var csrf = arguments[2];

var formData = new FormData();
for (const key in jsonData) {
  formData.append(key, jsonData[key]);
}

fetch(url, {
  headers: {
    "csrf-prevention-token": csrf
  },
  body: formData,
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