export const CreateAuthor = ({ onCreate }) => (
  <fieldset>
    <form onSubmit={onCreate}>
      <div>
        <label>Add new author</label>
      </div>
      <div>
        <label htmlFor="name">Name</label>
        <input id="name" name="name" />
      </div>
      <div>
        <label htmlFor="surname">Surname</label>
        <input id="surname" name="surname" />
      </div>
      <button>Add author</button>
    </form>
  </fieldset>
);
