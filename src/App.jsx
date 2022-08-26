import './css/main.css';
// para las rutas
import { HashRouter, Routes, Route } from 'react-router-dom';
// para seleccionar estados del store
import { useSelector } from 'react-redux';
// para despachar acciones
import { useDispatch } from 'react-redux';
// importando acciones del slice
import { increment, setCounter } from './store/slices/counter.slice';
// importando rutas protegidas
import ProtectedRoutes from './components/ProtectedRoutes';
// importando distintos componentes
import Login from './components/Login';
import Pokedex from './components/Pokedex';
import PokemonDetails from './components/PokemonDetails';

function App() {
  // para despachar acciones
  const dispatch = useDispatch();
  // tomando el valor del store
  const counter = useSelector(state => state.counter);

  const fn_increment = () => {
    // despachando acción
    dispatch(increment(counter))
  }
  const fn_setCounter = () => {
    // despachando acción
    dispatch(setCounter(330))
  }

  return (
    <div className="App">
      {/* <h1>{counter}</h1>
      <button onClick={fn_increment}>increment</button>
      <button onClick={fn_setCounter}>Set counter with 330</button> */}
      <HashRouter>
        {/* nav */}
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route element={<ProtectedRoutes/>}>
            {/* rutas protegidas abajo */}
            <Route path='/pokedex' element={<Pokedex/>}/>
            <Route path='/pokedex/pokemondetails/:id' element={<PokemonDetails/>}/>
          </Route>
        </Routes>
        {/* footer */}
      </HashRouter>
    </div>
  )
}

export default App;