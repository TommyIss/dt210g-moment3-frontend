import type { User } from "../types/auth.types";
import DataArticle from "./DataArticle";

interface UserViewProps {
    inloggedUser: User,
    updateUser: (id: number, newData: Omit<User, "id" | "role">) => void,
    deleteUser: (id: number) => void,
    startEditing: (id: number | null) => void,
    editingId: number | null
}

function UserView({inloggedUser, updateUser, deleteUser, startEditing, editingId}: UserViewProps) {
    return(
        <section>
             <DataArticle 
                    key={inloggedUser.id}
                    id={inloggedUser.id}
                    firstname={inloggedUser.firstname}
                    lastname={inloggedUser.lastname}
                    email={inloggedUser.email}
                    role={inloggedUser.role}
                    startEditing={startEditing}
                    editUser={updateUser}
                    removeUser={deleteUser}
                    isEditing={editingId === inloggedUser.id}
                    />
        </section>
    )
}

export default UserView;