import axios from "axios"
import React, { useEffect, useState } from "react"
import {
  Accordion,
  Button,
  Card,
  Col,
  Dropdown,
  Form,
  Row,
} from "react-bootstrap"
import availableScrapers from "../data/scrapers.json"
import { useApp } from "./Provider"

export const DataPanel = () => {
  const scraper_types = Object.keys(availableScrapers)
  console.log(scraper_types)
  const [search, setSearch] = useState("")
  const { searchResult, setSearchResult } = useApp("")
  const [page, setPage] = useState(1)

  const handleSubmit = (e = "") => {
    if (e) e.preventDefault()

    axios
      .post(
        process.env.REACT_APP_API_URL + "/search",
        {
          data_format: process.env.REACT_APP_DATA_FORMAT,
          sub_string: search,
          page: page,
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status == 200) {
          setSearchResult(response.data.result)
        } else {
        }
      })
      .catch((error) => Promise.reject(error))
  }

  const format = (data) => {
    const {
      id,
      eshop,
      title,
      category,
      sub_category,
      price_without_vat,
      price_with_vat,
      tax,
      url,
      image_url,
    } = data._source

    return (
      <p>
        <span>
          <b>id: </b>
          {id}
        </span>
        <br></br>
        <span>
          <b>E-Shop: </b>
          {`${eshop}`}
        </span>
        <br></br>
        <span>
          <b>category: </b>
          {category}
        </span>
        <br></br>
        <span>
          <b>Sub category: </b>
          {sub_category}
        </span>
        <br></br>
        <span>
          <b>Price With Vat: </b>
          {price_with_vat}
        </span>
        <br></br>
        <span>
          <b>Price Without Vat: </b>
          {price_without_vat}
        </span>
        <br></br>
        <span>
          <b>Tax: </b>
          {tax}
        </span>
        <br></br>
        <span>
          <b>Link: </b>
          <a href={url}>Link</a>
        </span>
        <br></br>
        <img src={image_url} alt={title}></img>
        <br></br>
      </p>
    )
  }

  const goNext = () => {
    setPage((prevState) => prevState + 1)
  }

  const goPrevious = () => {
    setPage((prevState) => prevState - 1)
  }

  useEffect(() => {
    if (page > 1) handleSubmit()

    if (searchResult == 0) setSearchResult("")
  }, [page])
  return (
    <div className="pt-1">
      <h2>Data</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col sm={10}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="text"
                placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
              />
              <Form.Text className="text-muted">
                Search by product Name
              </Form.Text>
            </Form.Group>
          </Col>
          <Col sm={2}>
            <Dropdown>
              <Dropdown.Toggle variant="success btn-block" id="dropdown-basic">
                Filter
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  Select Name:
                  <select>
                    {scraper_types.map((type) => {
                      return (
                        <optgroup label={type}>
                          {type}
                          {availableScrapers[type].names.map((name) => (
                            <option>{name}</option>
                          ))}
                        </optgroup>
                      )
                    })}
                  </select>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Form>
      {searchResult &&
        searchResult.map((data, i) => {
          console.log(data, i)
          return (
            <Accordion defaultActiveKey="1">
              <Card key={i + 1}>
                <Card.Header default>
                  <Accordion.Toggle as={Button} variant="link" eventKey={i + 1}>
                    {`${data._source.title} - ${data._source.price_without_vat} CZK (Click to open)`}
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={i + 1}>
                  <Card.Body>{format(data)}</Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          )
        })}
      {page > 1 && (
        <Button onClick={goPrevious} id="previous" className="mt-1">
          Previous
        </Button>
      )}
      {searchResult.length != 0 && (
        <Button onClick={goNext} id="next" className="mt-1">
          Next
        </Button>
      )}
    </div>
  )
}
