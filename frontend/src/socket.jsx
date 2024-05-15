import { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext();

// const getSocket = () => useContext(SocketContext);
const getSocket = () => {
  return useContext(SocketContext);
};

const SocketProvider = ({ children }) => {
  //   const socket = useMemo(() => io(server, { withCredentials: true }), []);
  const socket = useMemo(() => {
    return io(server, { withCredentials: true });
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
