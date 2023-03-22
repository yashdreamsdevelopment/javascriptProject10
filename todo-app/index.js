const noteInput = document.getElementById("note");
const addNoteBtn = document.getElementById("addNote");
const notesContainer = document.querySelector(".notes");

displayNotes();

addNoteBtn.addEventListener("click", (e) => {
  const noteText = noteInput.value;

  if (noteText !== "" && noteText) {
    addNote(noteText);
    noteInput.value = "";
  } else {
    alert("Notes can't be empty!");
  }
});

function addNote(text) {
  const notesArr = JSON.parse(localStorage.getItem("todo-notes"));

  const note = {
    title: text,
    isCompleted: false,
  };

  if (notesArr) {
    localStorage.setItem("todo-notes", JSON.stringify([...notesArr, note]));
  } else {
    localStorage.setItem("todo-notes", JSON.stringify([{ note }]));
  }

  displayNotes();
}

function deleteNote(id) {
  const notesArr = JSON.parse(localStorage.getItem("todo-notes"));

  localStorage.setItem(
    "todo-notes",
    JSON.stringify(notesArr.filter((note, index) => index !== id))
  );

  displayNotes();
}

function editNote(id) {
  const notesArr = JSON.parse(localStorage.getItem("todo-notes"));

  localStorage.setItem(
    "todo-notes",
    JSON.stringify(
      notesArr.map((note, index) => {
        if (index === id) {
          notesArr[index].isCompleted = !notesArr[index].isCompleted;
        }
        return note;
      })
    )
  );

  displayNotes();
}

function displayNotes() {
  const notesArr = JSON.parse(localStorage.getItem("todo-notes"));

  let html = "";

  if (notesArr.length > 0) {
    notesArr.forEach((note, index) => {
      html += `
            <div class="note">
              <h4 class=${note.isCompleted ? "completed" : ""}>
                ${note.title}
              </h4>
                
                <div class="actions">
                    <button class="edit" title="mark complete" onClick="editNote(${index})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete" title="delete note" onClick="deleteNote(${index})">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>`;
    });
  } else {
    html += "<h4 class='empty'>No Todos</h4>";
  }

  notesContainer.innerHTML = html;
}
