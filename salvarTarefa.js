// salvarTarefa.js
import { db } from './firebase.js'; // importa a configuração do Firebase
import { collection, addDoc, Timestamp } from 'firebase/firestore'; // Importa as funções do Firestore

// Função para salvar uma tarefa no Firestore
async function salvarTarefa() {
try {
    // Define os dados da tarefa
    const tarefa = {
    titulo: "Estudar para o exame",
    descricao: "Revisar os tópicos de Firebase",
    concluida: false,
    usuarioId: "usuario_123",
      dataCriacao: Timestamp.fromDate(new Date()) // Converte para o formato Timestamp do Firestore
    };

    // Adiciona a tarefa na coleção "tarefas"
    const docRef = await addDoc(collection(db, "tarefas"), tarefa);

    console.log("Tarefa adicionada com sucesso! ID do documento:", docRef.id);
} catch (e) {
    console.error("Erro ao salvar tarefa:", e);
}
}

// Chama a função para salvar a tarefa
salvarTarefa();
