import React, { createContext, useState, useContext } from "react"

const AppContext = createContext()
export const useApp = () => useContext(AppContext)

export const AppProvider = ({ children }) => {
  const [menuAlert, setMenuAlert] = useState(false)
  const [menuSpinner, setMenuSpinner] = useState(false)
  const [menuStep, setMenuStep] = useState("menu")
  const [dataAlert, setDataAlert] = useState(false)
  const [dataSpinner, setDataSpinner] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [parsingAlert, setParsingAlert] = useState(false)
  const [parsingLog, setParsingLog] = useState('')
  const [searchResult, setSearchResult] = useState('')

  return (
    <AppContext.Provider
      value={{
        menuAlert,
        setMenuAlert,
        menuSpinner,
        setMenuSpinner,
        menuStep,
        setMenuStep,
        dataAlert,
        setDataAlert,
        dataSpinner,
        setDataSpinner,
        parsing,
        setParsing,
        parsingAlert,
        setParsingAlert,
        parsingLog, setParsingLog,
        searchResult, setSearchResult,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
