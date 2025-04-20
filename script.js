import { db, auth } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
import { ref, push, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const lista = document.getElementById("lista-tarefas");
const input = document.getElementById("tarefa-input");

let usuarioId = null;

// Espera o usuário logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    usuarioId = user.uid;
    carregarTarefas();
  } else {
    window.location.href = "login.html";
  }
});

function adicionarTarefa() {
  const texto = input.value.trim();
  if (texto === "") return;

  const tarefasRef = ref(db, `usuarios/${usuarioId}/tarefas`);
  push(tarefasRef, {
    texto,
    concluida: false
  });

  input.value = "";
}

function carregarTarefas() {
  const tarefasRef = ref(db, `usuarios/${usuarioId}/tarefas`);

  onValue(tarefasRef, (snapshot) => {
    lista.innerHTML = ""; // Limpa a lista antes de carregar novamente

    snapshot.forEach((child) => {
      const tarefa = child.val();
      const key = child.key;

      const li = document.createElement("li");
      li.textContent = tarefa.texto;
      li.style.textDecoration = tarefa.concluida ? "line-through" : "none";

      // Marca como concluída ao clicar na tarefa
      li.addEventListener("click", () => {
        const atualizada = !tarefa.concluida;
        update(ref(db, `usuarios/${usuarioId}/tarefas/${key}`), { concluida: atualizada });
      });

      // Adiciona animação ao riscar a tarefa
      li.classList.add("completed-animation");

      // Cria o botão de remover
      const btnRemover = document.createElement("button");
      btnRemover.textContent = "X";
      btnRemover.onclick = () => {
        // Adiciona animação de remoção antes de excluir
        li.classList.add("remove-animation");
        setTimeout(() => {
          remove(ref(db, `usuarios/${usuarioId}/tarefas/${key}`));
        }, 300); // Espera o tempo da animação
      };

      li.appendChild(btnRemover);
      lista.appendChild(li);
    });
  });
}

import { signOut } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    alert("Logout realizado com sucesso!");
    window.location.href = "login.html";
  }).catch((error) => {
    alert("Erro ao sair: " + error.message);
  });
});

window.adicionarTarefa = adicionarTarefa;
