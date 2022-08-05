import { ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Editor } from "./pages/game/editor/editor";
import { Game } from "./pages/game/game";
import { Lobby } from "./pages/game/lobby/lobby";
import { MainPage } from "./pages/main-page/main-page";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route
            path="room"
            element={
              <Game>
                <Outlet />
              </Game>
            }
          >
            <Route index={true} element={<Navigate to={"/"} />} />
            <Route path=":id" element={<Lobby />} />
            <Route path=":id/editor" element={<Editor />} />
            Editor
          </Route>
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
