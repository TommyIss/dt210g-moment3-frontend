import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Notification from "../components/Notification";

function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const {login, user} = useAuth();
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

    // Kontrollera användaren
    useEffect(() => {
        if(user) {
            navigate('/profile');
        }
    }, [user])

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError('');

        try {
            await login({email, password});
            navigate('/profile');
        } catch (error) {
            showNotification('Inloggningen misslyckades. Kontrollera att du har korrekt e-post och lösenord.', 'error');
        }
    }

    return(
        <div>
            <h2>Logga in</h2>
            <fieldset>
                <legend>Logga in</legend>
                <form onSubmit={handleSubmit}>
                    {
                    notification && (
                        <Notification message={notification.message} type={notification.type} />
                    )
                    }

                    <label htmlFor="email">E-post:</label>
                    <br />
                    <input type="email" 
                    id="email"
                    required
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    />

                    <br />
                    <label htmlFor="password">Lösenord:</label>
                    <br />
                    <input type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />

                    <br />
                    <input type="submit" value="Logga in" />
                </form>
            </fieldset>
        </div>
    )
}

export default LoginPage;