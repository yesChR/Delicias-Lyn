import { useAuth } from "../../context/authContext";

const RolePageGuard = ({ role, children }) => {
  const { user } = useAuth(); // Obtiene el usuario del contexto

  // Si el rol del usuario no coincide o no está logueado, muestra el mensaje "No autorizado"
  if (!user || user.rol !== role) {
    return (
      <div style={styles.overlay}>
        <div style={styles.message}>No autorizado 401</div>
      </div>
    );
  }

  return children; // Renderiza el contenido si el rol coincide
};

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // Asegura que el overlay esté por encima de todo
  },
  message: {
    color: "black",
    fontSize: "2rem",
    fontWeight: "bold",
    textAlign: "center",
    padding: "20px",
    borderRadius: "8px",
  },
};

export default RolePageGuard;
