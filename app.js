function getFormValue(key) {
  const element = document.getElementById(key);
  return element?.value;
}

function setToast(color, text) {
  const toast = document.getElementById("toast");
  toast.style.borderLeftColor = color;
  toast.style.color = color;
  toast.style.display = "block";
  toast.innerHTML = text;
}

function hideToast() {
  const toast = document.getElementById("toast");
  toast.style.display = "none";
}

async function revoke(accessToken, clientId) {
  const req = await fetch("https://id.twitch.tv/oauth2/revoke", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `client_id=${clientId}&token=${accessToken}`,
  });

  if (req.status === 200) {
    setToast("#5F5", "Token revoked successfully.");
  } else {
    const json = await req.json();
    setToast("#F55", "Error: " + json.message);
  }
}

document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();

  setToast("orange", "Please wait...");

  const accessToken = getFormValue("access-token");
  const clientId = getFormValue("client-id");

  revoke(accessToken, clientId);
});
