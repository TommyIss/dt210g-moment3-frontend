import { useState } from "react";
import UserForm from "../components/UserForm";
import type { User } from "../types/auth.types";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";

function RegisterPage() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Visa notis
  function showNotification(
    message: string,
    type: "success" | "error" = "success",
  ) {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }

  async function createNewUser(newData: Omit<User, "id" | "role">) {
    try {

      if(!newData.firstname || newData.firstname === '') {
        showNotification('Förnamn saknas!', 'error');
        return;
      }
      if(!newData.lastname || newData.lastname === '') {
        showNotification('Efternamn saknas!', 'error');
        return;
      }
      if(!newData.email || newData.email === '') {
        showNotification('E-post saknas!', 'error');
        return;
      }
      if(!newData.password || newData.password === '') {
        showNotification('Lösenord saknas!', 'error');
        return;
      }
      let url =
        "https://tois-dt210g-moment3-backend.onrender.com/auth/register";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        const data = await response.json();

        const message = data.message;

        showNotification(message);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
        return;
      }

      showNotification("Kunde inte skapa konto", "error");
    } catch (error) {
      showNotification("Ett fel har inträffats!", "error");
      throw error;
    }
  }

  return (
    <div>
      <h2>Skapa konto</h2>
      <p>
        I denna sida kan du skapa ett användarkonto genom att fylla i formuläret och trycka på skapa konto
      </p>
      {
      notification && (
        <Notification message={notification.message} type={notification.type} />
      )
      }
      <UserForm createUser={createNewUser} />
    </div>
  );
}

export default RegisterPage;
