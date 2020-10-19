import axios from "axios"
import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { Check } from "./Check"
import { useApp } from "./Provider"
import { Scrape } from "./Scrape"
import { Scrapping } from "./Scrapping"

export const Menu = () => {
  const { menuStep, setMenuStep, setSearchResult} = useApp()

  const handleButtonClick = (e) => {
    const { id } = e.target
    switch (id) {
      case "new":
        setMenuStep("scrape")
        break
      case "existing":
        setMenuStep("check")
        break
      case "scrapping":
        setMenuStep("scrapping")
        break
      default:
        alert("Button doesn't exist")
    }
  }

  const handleShowData = () => {
    axios
    .post(
      process.env.REACT_APP_API_URL + "/search",
      {
        data_format: process.env.REACT_APP_DATA_FORMAT, 
        sub_string: '', 
        page: 1
      },
      { withCredentials: true }
    )
    .then((response) => {
      if(response.status == 200){
        setSearchResult(response.data.result)
      } else {
        
      }
    })
    .catch((error) => Promise.reject(error))
  }
  if (menuStep === "scrape") {
    return <Scrape />
  } else if (menuStep === "check") {
    return <Check />
  } else if (menuStep === "scrapping") {
    return <Scrapping />
  }

  return (
    <>
      <h3>Menu</h3>
      <Button
        id="new"
        variant="outline-success btn-block"
        onClick={handleButtonClick}
      >
        Scrape New Data
      </Button>
      <Button
        id="existing"
        variant="outline-primary btn-block"
        onClick={handleShowData}
      >
        Show All Scraped Data
      </Button>
      <Button
        id="delete"
        variant="outline-warning btn-block"
        onClick={handleButtonClick}
      >
        Clear Data Base
      </Button>
    </>
  )
}
