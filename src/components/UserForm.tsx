import { useState } from "react";
import type { User } from "../types/auth.types";
import './UserForm.css'

interface UserFormProps {
  createUser: (user: Omit<User, "id" | "role">) => void;
  setFormType?: (type: string | null) => void;
  formType?: string | null
}

function UserForm({ createUser, setFormType, formType }: UserFormProps) {
  const [newUser, setNewUser] = useState<Omit<User, "id" | "role">>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  function handleSubmit( event: React.FormEvent<HTMLFormElement> ) {
    event.preventDefault();

    createUser(newUser);

    if(setFormType) {

      setTimeout(() => {
        setFormType(null)
      }, 1500 );
    
    }
    
  }

  return (
    <fieldset>
      <legend>Skapa ett nytt konto för {formType === 'user' && 'användare'}{formType === 'admin' && 'admin'}</legend>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Förnamn:</label>
        <input
          type="text"
          value={newUser.firstname}
          required
          onChange={(event) =>
            setNewUser({ ...newUser, firstname: event.target.value })
          }
        />
        <br />
        <label htmlFor="lastname">Efternamn:</label>
        <input
          type="text"
          value={newUser.lastname}
          required
          onChange={(event) =>
            setNewUser({ ...newUser, lastname: event.target.value })
          }
        />
        <br />
        <label htmlFor="email">E-post:</label>
        <input
          type="email"
          value={newUser.email}
          required
          onChange={(event) =>
            setNewUser({ ...newUser, email: event.target.value })
          }
        />
        <br />
        <label htmlFor="password">Lösenord:</label>
        <input
          type="password"
          value={newUser.password}
          required
          onChange={(event) =>
            setNewUser({ ...newUser, password: event.target.value })
          }
        />
        <br />

        <button type="submit">Skapa konto</button>

        {/* Om det inte är kontoregistrering */}
        {
          setFormType && 
          <button type="submit">Spara</button> &&
          <button type="button" onClick={() => setFormType(null)}>Avbryt</button>
        }
        
      </form>
    </fieldset>
  );
}

export default UserForm;
