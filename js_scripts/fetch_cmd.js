var done = arguments[arguments.length - 1];
var formData = new FormData();
const jsonData = JSON.parse(atob('{formData}'));

for (const key in jsonData) {{
    formData.append(key,jsonData[key])
}}

fetch("{url}", {{
  "headers": {{
    "csrf-prevention-token": "{csrf}"
    }},
  "body": formData,
  "method": "POST",
}}).then(r => {{ r.json().then( v=>{{done([r.status,v])}} ) }} );