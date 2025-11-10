const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const btn = document.getElementById("getQuote");

async function getQuote() {
  if (!quoteEl || !authorEl) return;

  try {
    btn && btn.setAttribute("disabled", "");
  } catch (e) {
    // ignore this error
  }

  quoteEl.textContent = "Loading...";
  authorEl.textContent = "";

  try {
    const res = await fetch("https://api.quotable.io/random");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    quoteEl.textContent = `"${data.content}"`;
    authorEl.textContent = data.author ? `— ${data.author}` : "— Unknown";
  } catch (err) {
    console.error("Failed to load quote:", err);
    // friendly fallback message
    quoteEl.textContent = "Failed to load quote. Please check your connection and try again.";
    authorEl.textContent = "";
  } finally {
    try {
      btn && btn.removeAttribute("disabled");
    } catch (e) {
      // ignore
    }
  }
}

// attach handler if button exists
if (btn) {
  btn.addEventListener("click", getQuote);
} else {
  console.warn("Get Quote button not found (id: getQuote)");
}

// Load an initial quote when the page is ready
document.addEventListener("DOMContentLoaded", () => {
  // If script is placed before DOM (unlikely here), this ensures DOM is ready.
  getQuote();
});
