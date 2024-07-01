export const AuthorsTable = ({ authors = [], onDelete, onEdit }) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
      </tr>
    </thead>
    <tbody>
      {authors.map((author) => (
        <tr key={author.id}>
          <td>{author.name}</td>
          <td>{author.surname}</td>
          <td>
            <button
              onClick={() => onEdit(author.id)}
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>
            <button onClick={() => onDelete(author.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
export default AuthorsTable;
