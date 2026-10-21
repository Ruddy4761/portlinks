(() => {
  if (!document.querySelector("#demo-dialog")) {
    document.body.insertAdjacentHTML(
      "beforeend",
      `<dialog class="demo-dialog" id="demo-dialog" aria-labelledby="demo-title" aria-describedby="demo-intro">
        <div class="demo-dialog__content">
          <button class="demo-dialog__close" type="button" data-demo-close aria-label="Close form">&times;</button>
          <p class="mono">PORTLINKS INDIA</p>
          <h2 id="demo-title">Connect With Us</h2>
          <p class="demo-dialog__intro" id="demo-intro">Share your details and our team will be in touch.</p>
          <form id="demo-form" data-endpoint="">
            <label>Name<input name="name" autocomplete="name" required /></label>
            <label>Company name<input name="companyName" autocomplete="organization" required /></label>
            <label>Phone number<input name="phone" type="tel" autocomplete="tel" required /></label>
            <label>Email<input name="email" type="email" autocomplete="email" required /></label>
            <p class="demo-dialog__note">Online submissions are not connected yet. For now, email <a href="mailto:info@portlinksindia.com">info@portlinksindia.com</a>.</p>
            <p class="demo-dialog__status" id="demo-status" role="status" aria-live="polite"></p>
            <button class="btn" type="submit">Submit request</button>
          </form>
        </div>
      </dialog>`,
    );
  }

  const dialog = document.querySelector("#demo-dialog");
  const form = document.querySelector("#demo-form");
  const status = document.querySelector("#demo-status");

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && dialog.open) {
        event.preventDefault();
        dialog.close();
      }
    },
    true,
  );

  document.addEventListener(
    "click",
    (event) => {
      const trigger =
        event.target instanceof Element
          ? event.target.closest("a, button")
          : null;
      if (!trigger) return;

      const label = trigger.textContent.replace(/\s+/g, " ").trim().toLowerCase();
      if (
        label !== "connect with us" &&
        label !== "request a demo" &&
        label !== "request access"
      )
        return;

      event.preventDefault();
      event.stopImmediatePropagation();
      dialog.showModal();
    },
    true,
  );

  dialog
    .querySelector("[data-demo-close]")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const endpoint = form.dataset.endpoint.trim();
    if (!endpoint) {
      status.textContent =
        "Online submissions are not connected yet. Please email info@portlinksindia.com for now.";
      return;
    }

    const submit = form.querySelector('[type="submit"]');
    submit.disabled = true;
    status.textContent = "Sending your request...";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!response.ok) throw new Error(`Submission failed: ${response.status}`);
      form.reset();
      status.textContent = "Thanks. Your request has been sent.";
    } catch (error) {
      console.error("Demo request submission failed", error);
      status.textContent =
        "We could not send your request. Please try again or email info@portlinksindia.com.";
    } finally {
      submit.disabled = false;
    }
  });
})();
