import { useEffect, useState } from "react";
import type { User } from "../types/auth.types";

interface DataArticleProps extends User {
  editUser: (id: number, updatedData: Omit<User, "id" | "role">) => void;
  removeUser: (id: number) => void;
  isEditing: boolean;
  startEditing: (id: number | null) => void;
}

function DataArticle({
  id,
  firstname,
  lastname,
  email,
  role,
  editUser,
  removeUser,
  isEditing,
  startEditing,
}: DataArticleProps) {

  const [editData, setEditData] = useState<Omit<User, "id" | "role">>({
    firstname,
    lastname,
    email,
    password: '',
  });

  function handleSubmit( event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault();

    editUser(id, editData);
  }

  useEffect(() => {
  if (isEditing) {
    setEditData({
      firstname,
      lastname,
      email,
      password: ""
    });
  }
}, [isEditing, firstname, lastname, email]);


  if (isEditing) {
    return (
      <article key={id}>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstname">Förnamn:</label>
          <input
            type="text"
            value={editData.firstname}
            onChange={(event) =>
              setEditData({ ...editData, firstname: event.target.value })
            }
          />
          <br />
          <label htmlFor="lastname">Efternamn:</label>
          <input
            type="text"
            value={editData.lastname}
            onChange={(event) =>
              setEditData({ ...editData, lastname: event.target.value })
            }
          />
          <br />
          <label htmlFor="email">E-post:</label>
          <input
            type="email"
            value={editData.email}
            onChange={(event) =>
              setEditData({ ...editData, email: event.target.value })
            }
          />
          <br />
          <label htmlFor="password">Lösenord:</label>
          <input
            type="password"
            value={editData.password}
            onChange={(event) =>
              setEditData({ ...editData, password: event.target.value })
            }
          />
          <br />
          <button type="submit">Spara</button>
          <button type="button" onClick={() => startEditing(null)}>Avbryt</button>
        </form>
      </article>
    );
  }

  return (
    <article key={id}>
      <h5>
        {firstname} {lastname}
      </h5>
      <p>E-post: {email}</p>
      <p>Roll: {role}</p>
      <button onClick={() => startEditing(id)}>Ändra</button>
      <button onClick={() => removeUser(id)}>Radera</button>
    </article>
  );
}

export default DataArticle;
