import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
import { Results } from "./pages/game/results/results";
import { MainPage } from "./pages/main-page/main-page";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
              <Route path=":id/results" element={<Results />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </DndProvider>
  );
}

export default App;
