import './App.scss';
import NoteList from './components/NotesList/NoteList';

import { motion } from 'framer-motion';
function App() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="title">Pcon Nodejs Todo App</div>
      <NoteList />
      <div className="disclaimer">
        <p>
          <a
            href="https://github.com/DYSLEVIUM/pcon-nodejs-todo"
            rel="noreferrer"
            target="_blank"
          >
            Click to open repository in github.
          </a>
        </p>
        <p>
          Please don't post any NSFW content. I am recording the public ip as
          well. 😅
        </p>
      </div>
    </motion.main>
  );
}

export default App;
