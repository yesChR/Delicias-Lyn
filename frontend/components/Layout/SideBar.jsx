import { Button, useDisclosure } from "@nextui-org/react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useAuth } from "../../context/authContext";
import LoginModal from "../Usuario/Auth";
import ResetModal from "../Usuario/Reset";
import ModalInforme from "../Informe/ModalInforme";

const SideBar = ({ estaAbierto }) => {
  //aqui tengo el valor de la ruta del .env
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const [categorias, setCategorias] = useState([]);
  const [estados, setEstados] = useState([]);
  const [desplegarCategorias, setDesplegarCategorias] = useState(false);
  const [desplegarSubcategorias, setDesplegarSubcategorias] = useState(0);
  const [desplegarGestiones, setDesplegarGestiones] = useState(false);
  const [desplegarPedidos, setDesplegarPedidos] = useState(false);
  const { isLoggedIn, resetContext } = useAuth(); // Accede a la propiedad de autenticación
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const accionarDespCategorias = () => {
    setDesplegarCategorias(!desplegarCategorias);
  };

  const accionarDespSubcategorias = (numSubcategoria) => {
    const nuevoEstadoSubcategoria =
      desplegarSubcategorias === numSubcategoria ? 0 : numSubcategoria;
    setDesplegarSubcategorias(nuevoEstadoSubcategoria);
  };

  const accionarDespGestiones = () => {
    setDesplegarGestiones(!desplegarGestiones);
  };

  const accionarDespPedidos = () => {
    setDesplegarPedidos(!desplegarPedidos);
  };

  // Función para verificar si el token existe en localStorage
  const checkToken = () => {
    return localStorage.getItem("TOKEN") !== null;
  };

  const handleMisPedidosClick = async () => {
    // Verificar si el usuario está autenticado
    if (!isLoggedIn) {
      // Mostrar un Swal pidiendo que se inicie sesión
      Swal.fire({
        title: "Debe iniciar sesión",
        text: "Por favor, inicie sesión para acceder a sus pedidos.",
        icon: "warning",
        confirmButtonColor: "#ff6984",
        confirmButtonText: "Iniciar sesión",
      }).then((result) => {
        if (result.isConfirmed) {
          // Abrir el modal de inicio de sesión
          setIsLoginOpen(true);
        }
      });
      return; // No continuar si no está autenticado
    } else {
      router.push("/mis-pedidos");
    }
  };

  // Cargar las categorías desde la API
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(`${apiUrl}/categoria/visualizar`);
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        } else {
          Swal.fire({
            title: "Error al cargar las categorías",
            icon: "error",
            confirmButtonColor: "#fdc6c6",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error) {
        console.error("Error al obtener categorías", error);
        Swal.fire({
          title: "Error al obtener categorías",
          icon: "error",
          confirmButtonColor: "#fdc6c6",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    };

    fetchCategorias();
  }, []);

  // Cargar estados desde la API
  useEffect(() => {
    const fetchEstados = async () => {
      try {
        const response = await fetch(`${apiUrl}/estado/visualizar`);
        if (response.ok) {
          const data = await response.json();
          setEstados(data);
        } else {
          Swal.fire({
            title: "Error al cargar los estados",
            icon: "error",
            confirmButtonColor: "#fdc6c6",
            showConfirmButton: false,
            timer: 1000,
          });
        }
      } catch (error) {
        console.error("Error al obtener los estados", error);
        Swal.fire({
          title: "Error al obtener los estados",
          icon: "error",
          confirmButtonColor: "#fdc6c6",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    };

    fetchEstados();
  }, []);

  return (
    <div
      className={`bg-secundario absolute top-38 left-0 h-[700px] z-40 shadow-lg 
            ${estaAbierto ? "translate-x-0" : "-translate-x-full"} 
            transition-transform duration-300 ease-in-out w-38 lg:w-48`}
    >
      <div className="p-4 overflow-y-auto h-full mt-3 scroll">
        <div className="flex flex-col justify-start gap-2">
          <Link
            href={"/"}
            className="bg-btnSideBar1 text-md shadow-md rounded-full h-[34px] flex justify-center hover:bg-btnSideBar2"
          >
            <div className="mt-1.5">Productos</div>
          </Link>
          <Button
            radius="full"
            size="sm"
            className="bg-btnSideBar1 text-md shadow-md"
            onClick={accionarDespCategorias}
          >
            Categorias
          </Button>
          {desplegarCategorias && (
            <div className="gap-2 flex justify-start flex-col">
              {categorias.map((categoria) => (
                <div
                  key={categoria.idCategoria}
                  className="gap-2 flex justify-start flex-col"
                >
                  <Button
                    fullWidth
                    radius="full"
                    size="sm"
                    className="bg-btnSideBar2 text-sm shadow-md"
                    onClick={() =>
                      accionarDespSubcategorias(categoria.idCategoria)
                    }
                  >
                    {categoria.nombre}
                  </Button>
                  {desplegarSubcategorias === categoria.idCategoria && (
                    <div className="gap-2 flex justify-start flex-col">
                      {" "}
                      {/* Agrega un margen para anidar mejor */}
                      {categoria.subcategoria.map((sub) => (
                        <Button
                          href={`/categoria-productos?idSubcategoria=${sub.idSubcategoria}`}
                          as={Link}
                          key={sub.idSubcategoria}
                          fullWidth
                          radius="full"
                          size="sm"
                          className="bg-btnSideBar3 text-sm shadow-md"
                        >
                          {sub.nombre}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <Button
            fullWidth
            radius="full"
            size="sm"
            className="bg-btnSideBar1 text-md shadow-md"
            onClick={accionarDespGestiones}
          >
            Gestiones
          </Button>
          {desplegarGestiones && (
            <div className="gap-2 flex justify-start flex-col">
              <Link
                href={"/gestion-producto"}
                className="bg-btnSideBar2 text-sm shadow-md rounded-full h-[34px] flex justify-center hover:bg-secundario"
              >
                <div className="mt-1.5">Productos</div>
              </Link>
              <Link
                href={"/gestion-categoria"}
                className="bg-btnSideBar2 text-sm shadow-md rounded-full h-[34px] flex justify-center  hover:bg-secundario"
              >
                <div className="mt-1.5">Categorias</div>
              </Link>
              <Link
                href={"/gestion-subcategoria"}
                className="bg-btnSideBar2 text-sm shadow-md rounded-full h-[34px] flex justify-center  hover:bg-secundario"
              >
                <div className="mt-1.5">Subcategorias</div>
              </Link>
            </div>
          )}

          <Button
            fullWidth
            radius="full"
            size="sm"
            className="bg-btnSideBar1 text-md shadow-md"
            onClick={accionarDespPedidos}
          >
            Pedidos
          </Button>
          {desplegarPedidos && (
            <div className="gap-2 flex justify-start flex-col">
              {estados.map((estado) => (
                <div
                  key={estado.idEstado}
                  className="gap-2 flex justify-start flex-col"
                >
                  <Button
                    href={`/pedidoEstados/?idEstado=${estado.idEstado}`}
                    as={Link}
                    fullWidth
                    radius="full"
                    size="sm"
                    className="bg-btnSideBar2 text-sm shadow-md"
                  >
                    {estado.nombre}
                  </Button>
                </div>
              ))}
            </div>
          )}
          <Button
            onClick={handleMisPedidosClick}
            fullWidth
            radius="full"
            size="sm"
            className="bg-btnSideBar1 text-md shadow-md"
          >
            Mis pedidos
          </Button>
          <Button onClick={onOpen} fullWidth radius="full" size="sm" className="bg-btnSideBar1 text-md shadow-md">
            Informe
          </Button>

          <LoginModal
            isOpen={isLoginOpen}
            onOpenChange={setIsLoginOpen}
            onResetOpen={() => {
              setIsLoginOpen(false);
              setIsResetOpen(true);
            }}
          />
        </div>
      </div>
      <ModalInforme isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
};

export default SideBar;