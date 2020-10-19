import React from "react"
import { Button, Spinner } from "react-bootstrap"
import { useApp } from "./Provider"

export const Scrapping = () => {
  const { setMenuStep, parsing, setParsingAlert, parsingLog } = useApp()
  const handleClick = () => {
    setMenuStep("menu")
    setParsingAlert(true)
  }
  return (
    <>
      {parsing && 
      <>
      <h2>Scrapping pages...</h2>
      <Spinner className="mt-3" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
      
      <Button
        variant="outline-primary btn-block"
        className="mt-4"
        onClick={handleClick}
      >
        Go To Menu((Scrapping will proceed at background))
      </Button>
      </>}
      {!parsing && 
      <>
        <h2>Scrapping Succeed</h2>
        <Button variant="outline-success btn-block" onClick={() => alert(parsingLog)}>Check Scrapping Status</Button>
        <Button variant="outline-primary btn-block" onClick={() => setMenuStep('menu')}>Go To Menu</Button>
      </>}
    </>
  )
}
