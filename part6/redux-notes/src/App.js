import React, { useEffect } from "react";
import Notes from "./components/Notes";
import NewNote from "./components/NewNote";
import Filter from "./components/Filter";
import { useDispatch } from "react-redux";
import noteService from "./services/notes";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    noteService.getAll().then((notes) => dispatch(initializeNotes(notes)));
  }, [dispatch]);
  return (
    <div>
      <NewNote />
      <Filter />
      <Notes />
    </div>
  );
};

export default App;
