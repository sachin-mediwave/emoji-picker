<!DOCTYPE html>
<html lang="en">
  <head>
    <link
      rel="modulepreload"
      href="https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/picker.js"
    />
    <link
      rel="modulepreload"
      href="https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/database.js"
    />
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.8em%22 font-size=%2280%22>:grinning:</text></svg>"
    />
    <meta charset="UTF-8" />
    <title>emoji-picker-element</title>
    <meta name="viewport" content="width=device-width" />
    <link href="style.css" rel="stylesheet" type="text/css" />
  </head>
  <body>
    <main>
      <div class="flex">
        <div>
          <input type="text" placeholder="Type here" />
          <emoji-picker></emoji-picker>
        </div>
      </div>
    </main>
    <script type="module">
      import "https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/picker.js";
      import "https://cdn.jsdelivr.net/npm/emoji-picker-element@^1/database.js"; // avoid extra round-trip
      import insertText from "https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js";

      const $ = document.querySelector.bind(document);
      const $$ = _ => Array.from(document.querySelectorAll(_));
      document.addEventListener("DOMContentLoaded", async () => {
        const picker = $("emoji-picker");
        const pre = $("pre");
        const onEvent = e => {
          console.log(e);
          pre.style.display = "block";
          pre.innerHTML = `Event: ${JSON.stringify(
            e.type
          )}\n\nData:\n\n${JSON.stringify(e.detail, null, 2)}`;
        };
        picker.addEventListener("emoji-click", e => {
          insertText(document.querySelector("input"), e.detail.unicode);
        });
        picker.addEventListener("skin-tone-change", onEvent);
        $$("input[name=darkmode]").forEach(input => {
          input.addEventListener("change", e => {
            picker.classList.toggle("dark", e.target.value === "dark");
            picker.classList.toggle("light", e.target.value === "light");
          });
        });
        $("#custom").addEventListener("change", async e => {
          if (e.target.checked) {
          } else {
            picker.customEmoji = [];
          }
          picker.classList.toggle("has-custom", !!e.target.checked);
        });
      });
    </script>
  </body>
</html>
