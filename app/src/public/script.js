const contraseña = document.getElementById("contraseña");
const resultado = document.getElementById("resultado");
const btnSuccess = document.getElementById("btn-success");
const btnCopy = document.getElementById("btn-copy");

const generarContraseña = async () => {
  const contraseñaOriginal = contraseña.value;

  if (contraseñaOriginal === "") {
    return alert("Debe ingresar una contraseña");
  }

  const response = await fetch("/api/hash", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ contraseña: contraseñaOriginal }),
  });

  const contraseñaHasheada = await response.json();
  resultado.value = contraseñaHasheada.data;

  btnCopy.disabled = false;
};

const copiarContraseña = async () => {
  const portapapeles = resultado.value;

  resultado.select();
  resultado.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(portapapeles);
  alert("¡Resultado copiado al portapapeles! 🎉");
  contraseña.value = "";
  resultado.value = "";
};

btnSuccess.addEventListener("click", generarContraseña);
btnCopy.addEventListener("click", copiarContraseña);
