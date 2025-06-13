import { createFileRoute } from '@tanstack/react-router';
import {
  Japan
} from "japan-prefectures-react";

import '../App.css';

export const Route = createFileRoute('/')({
  component: App,
});

function App() {
  return <div className='App'>
     <Japan
        className="stroke-slate-400 fill-slate-100"
        prefectureProps={{
          className:
            "transition-all stroke-slate-400 fill-white hover:fill-red-500",
        }}
        mapType='dense'
      />

  </div>;
}
