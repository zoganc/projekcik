import { useEffect, useState } from "react";
import { CreateAuthor } from "./components/CreateAuthor";
import { AuthorsTable } from "./components/AuthorsTable";
import "./styles.css";

const API_URL = "http://localhost:8000";

export default function App() {
  const [authors, setAuthors] = useState([]);
  const [editedAuthor, setEditedAuthor] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedSurname, setEditedSurname] = useState("");

  const onDeleteAuthorClickHandler = (id) => {
    fetch(`${API_URL}/authors/${id}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        setAuthors((prevAuthors) =>
          prevAuthors.filter((author) => author.id !== id)
        );
      }
    });
  };

  const onCreateAuthorClickHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const surname = event.target.surname.value;

    fetch(`${API_URL}/authors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        surname: surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          setAuthors((prevAuthors) => [...prevAuthors, data]);
        }
      });
  };

  const onEditAuthorClickHandler = (id) => {
    const authorToEdit = authors.find((author) => author.id === id);
    if (authorToEdit) {
      setEditedAuthor(authorToEdit);
      setEditedName(authorToEdit.name);
      setEditedSurname(authorToEdit.surname);
    }
  };

  const onSaveEditClickHandler = () => {
    fetch(`${API_URL}/authors/${editedAuthor.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: editedName,
        surname: editedSurname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) {
          const updatedAuthors = authors.map((author) =>
            author.id === data.id ? data : author
          );
          setAuthors(updatedAuthors);
          setEditedAuthor(null);
          setEditedName("");
          setEditedSurname("");
        }
      });
  };
  useEffect(() => {
    fetch(`${API_URL}/authors`)
      .then((res) => res.json())
      .then((data) => setAuthors(data));
  }, []);

  return (
    <div className="app">
      <h1>Authors</h1>
      <div style={{ marginBottom: "50px" }}>
        <CreateAuthor onCreate={onCreateAuthorClickHandler} />
      </div>
      <AuthorsTable
        authors={authors}
        onDelete={onDeleteAuthorClickHandler}
        onEdit={onEditAuthorClickHandler}
      />
      {editedAuthor && (
        <div style={{ marginTop: "20px" }}>
          <h2>Edit Author</h2>
          <form>
            <label htmlFor="editedName">Name:</label>
            <input
              type="text"
              id="editedName"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
            <br />
            <label htmlFor="editedSurname">Surname:</label>
            <input
              type="text"
              id="editedSurname"
              value={editedSurname}
              onChange={(e) => setEditedSurname(e.target.value)}
            />
            <br />
            <button
              onClick={onSaveEditClickHandler}
              style={{ marginRight: "10px" }}
            >
              Save
            </button>
            <button onClick={() => setEditedAuthor(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
}
