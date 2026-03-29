
async function checkScam() {
  const text = document.getElementById("inputText").value;

  const res = await fetch("http://localhost:5000/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ text })
  });

  const data = await res.json();

  const resultText = data.result + " (Confidence: " + data.confidence + ")";
  document.getElementById("result").innerText = resultText;

  // color logic
  if (data.result.includes("Fake")) {
    document.getElementById("result").style.color = "red";
  } else {
    document.getElementById("result").style.color = "green";
  }
}