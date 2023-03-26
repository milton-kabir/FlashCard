import {createBrowserRouter} from 'react-router-dom';
import {FlashCardView} from "Frontend/views/FlashCardView";

const router = createBrowserRouter([
  {
    path: '/', element: <FlashCardView/>
  }
])
export default router;
