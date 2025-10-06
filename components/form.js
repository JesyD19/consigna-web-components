export function sendForm() {
  const url = "https://apx.school/api/utils/email-to-student";

  const name = document.querySelector("#name");

  const email = document.querySelector("#email");

  const message = document.querySelector("#message");

  const form = document.querySelector(".form__container");

  async function enviarMensaje() {
    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameValue || !emailValue || !messageValue) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (!emailPattern.test(emailValue)) {
      alert("Por favor, ingresa un email válido.");
      return;
    }

    const bodyMessage = `Mensaje de: ${nameValue} (${emailValue})\nContenido: ${messageValue}`;

    const data = {
      to: "jesy.dom19@gmail.com",
      message: bodyMessage,
    };

    try {
      const res = await fetch("https://apx.school/api/utils/email-to-student", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Error sending message");
      }

      const dataResponse = await res.json();
      alert("Mensaje enviado con éxito");
      console.log("Success:", dataResponse);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }

    name.value = "";
    email.value = "";
    message.value = "";
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    enviarMensaje();
  });
}
