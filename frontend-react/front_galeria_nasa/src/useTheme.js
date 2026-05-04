import { useState, createContext } from "react";
//Creo contexto que puedo compartir entre los componentes
const ThemeContext = createContext();
//Funcion proveedora donde se guarda el contexto del componente que se le pase
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState();

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};
export default ThemeContext;
