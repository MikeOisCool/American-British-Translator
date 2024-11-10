
const translateHandler = async () => {
  const textArea = document.getElementById("text-input");
  const localeArea = document.getElementById("locale-select");
  const errorArea = document.getElementById("error-msg");
  const translatedArea = document.getElementById("translated-sentence");
  
  errorArea.innerText = "";
  translatedArea.innerText = "";

  const data = await fetch("/api/translate", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-type": "application/json"
    },
    body: JSON.stringify({"text": textArea.value, "locale": localeArea.value})
  });

  const parsed = await data.json();
  console.log("Server Response:", parsed); 
  
  if (parsed.error) {
    console.log(parsed.error,'error')
    errorArea.innerText = JSON.stringify(parsed);
    return;
  }
  console.log('hier', parsed.translation)
  translatedArea.innerHTML = parsed.translation;
  return;
};

document.getElementById("translate-btn").addEventListener("click", translateHandler)
