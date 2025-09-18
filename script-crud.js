const botaoAdicionarTarefa = document.querySelector(".app__button--add-task");

// formulário e botões para criar nova tarefa
const formularioAdicionarTarefa = document.querySelector(".app__form-add-task");
const campoTextoAdicionarTarefa = document.querySelector(".app__form-textarea");
const botaoSalvarNovaTarefa = document.querySelector(".app__form-footer__button--confirm");
const botaoCancelarNovaTarefa = document.querySelector(".app__form-footer__button--cancel");
const botaoDeletarNovaTarefa = document.querySelector(".app__form-footer__button--delete");

const listaTarefas = [];

botaoAdicionarTarefa.addEventListener("click", () => {
  formularioAdicionarTarefa.classList.toggle("hidden");
});

formularioAdicionarTarefa.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const tarefa = { descricaoTarefa: campoTextoAdicionarTarefa.value };
  listaTarefas.push(tarefa);
  localStorage.setItem("listaTarefas", JSON.stringify(listaTarefas));
});
