import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  Button,
  Col,
  Form,
  FormControl,
  FormGroup,
  Alert,
} from "react-bootstrap"
import availableScrapers from "../data/scrapers.json"
import { useApp } from "./Provider"

export const Scrape = () => {
  const scraper_types = Object.keys(availableScrapers)
  const [scraper, setScraper] = useState({
    type: "",
    name: "",
    category: "",
    sub_category: "",
    categories: "",
    get_categories: false,
  })
  const {
    menuAlert,
    setMenuAlert,
    setParsing,
    menuSpinner,
    setMenuSpinner,
    setMenuStep,
    setParsingLog,
    setParsingAlert
  } = useApp()

  const handleSelect = (e) => {
    const { value, id } = e.target
    if (value === "default") {
      setScraper((prevState) => ({
        ...prevState,
        [id]: "",
      }))
      if (id === "name") {
        setScraper((prevState) => ({
          ...prevState,
          categories: "",
        }))
      }
      return
    }
    setScraper((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  useEffect(() => {
    console.log(scraper)
    if (scraper.type && scraper.name && !scraper.categories) {
      setScraper((prevState) => ({
        ...prevState,
        get_categories: true,
      }))
    }
  }, [scraper.name, scraper.type, scraper.categories])
  
  const unwrap = ({ url, title }) => ({ url, title })
  const handleButtonClick = (e) => {
    setMenuStep("scrapping")
    setParsing(true)
    axios
      .post(
        process.env.REACT_APP_API_URL + '/parse',
        {
            type: scraper.type,
            name: scraper.name,
            data_format: process.env.REACT_APP_DATA_FORMAT,
            category: unwrap(scraper.categories[scraper.category]),
            sub_category: scraper.sub_category ? unwrap(scraper.categories[scraper.category].sub_categories[scraper.sub_category]) : ''
        },
        {withCredentials: true}
      )
      .then(response => {
        setParsing(false)
        setParsingAlert(false)
        console.log(response)
        if(response.status == 200){
          setMenuStep('scrapping')
          setParsingLog(response.data.log)

        } else {
          setMenuStep('scrapping')
          setMenuAlert(true)
        }
      })
  }
  if (scraper.get_categories) {
    setScraper((prevState) => ({
      ...prevState,
      get_categories: false,
    }))
    setMenuSpinner(true)
    axios
      .post(
        process.env.REACT_APP_API_URL + "/categories",
        {
          type: scraper.type,
          name: scraper.name,
          data_format: process.env.REACT_APP_DATA_FORMAT,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response)
        if (response.status == 200) {
          setScraper((prevState) => ({
            ...prevState,
            categories: JSON.parse(response.data.categories),
          }))
          setMenuSpinner(false)
        } else {
          setMenuAlert(true)
        }
      })
      .catch((error) => Promise.reject(error))
  }

  return (
    <div>
      <h3>New Web Scrape</h3>
      {menuAlert && (
        <Alert variant='warning'> Something went wrong, Reload page and try again!</Alert>
      )}
      <Form>
        <FormGroup as={Col}>
          Choose type of web site
          <FormControl
            as="select"
            defaultValue="default"
            onChange={handleSelect}
            id="type"
          >
            <option value="default" key="default">
              Choose
            </option>
            {scraper_types.map((data) => {
              const title = availableScrapers[data].title
              return (
                <option value={data} key={title}>
                  {title}
                </option>
              )
            })}
          </FormControl>
        </FormGroup>
        {scraper.type && (
          <FormGroup as={Col}>
            Choose Name of web site
            <FormControl
              as="select"
              defaultValue="default"
              onChange={handleSelect}
              id="name"
            >
              <option value="default" key="default">
                Choose
              </option>
              {availableScrapers[scraper.type].names.map((data) => {
                return (
                  <option value={data} key={data}>
                    {data}
                  </option>
                )
              })}
            </FormControl>
          </FormGroup>
        )}
        {scraper.categories && (
          <FormGroup as={Col}>
            Choose category of products
            <FormControl
              as="select"
              defaultValue="default"
              onChange={handleSelect}
              id="category"
            >
              <option value="default" key="default">
                Choose
              </option>
              {Object.keys(scraper.categories).map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </FormControl>
          </FormGroup>
        )}
        {scraper.category && (
          <FormGroup as={Col}>
            Choose sub category (Optional)
            <FormControl
              as="select"
              defaultValue="default"
              onChange={handleSelect}
              id="sub_category"
            >
              <option value="default" key="default">
                Choose
              </option>
              {Object.keys(
                scraper.categories[scraper.category].sub_categories
              ).map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </FormControl>
            <Button
              variant="outline-success btn-block"
              className="mt-4"
              onClick={handleButtonClick}
            >
              Scrape!
            </Button>
          </FormGroup>
        )}
        {menuSpinner && (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </Form>
    </div>
  )
}
