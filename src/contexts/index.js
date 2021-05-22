import React, { useState, createContext } from "react";

const DataContext = createContext();
const { Provider } = DataContext;

const DataProvider = ({ children, dadosCliente }) => {
	const [dadosClienteAtual, setDadosClienteAtual] = useState(dadosCliente || {});
	
	const salvarDadosCliente = ( dados ) => {
		setDadosClienteAtual ( dados );
	}
	
  const value = { dadosCliente: dadosClienteAtual, salvarDadosCliente };
  return <Provider value={value}>{children}</Provider>;
};

export { DataContext, DataProvider };
