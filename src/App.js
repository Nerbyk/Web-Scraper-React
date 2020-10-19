import React from "react"
import { Alert, Col, Container, Jumbotron, Row, Spinner } from "react-bootstrap"
import { ControlPanel } from "./components/ControlPanel"
import { DataPanel } from "./components/DataPanel"
import { useApp } from "./components/Provider"

function App() {
  const {parsingAlert} = useApp()
  return (
    <div className="App">
      <div className="page-content">
      {parsingAlert &&
        <Alert variant="secondary" className="scrapping-alert">
        <Spinner animation="border" role="status" />
         <span className="ml-1">Scrapping in progress...</span>
        </Alert>}
      <Row className="justify-content-center">
        <Col sm={4}>
          <Container>
            <Jumbotron className="p-2 text-center">
              <ControlPanel />
            </Jumbotron>
          </Container>
        </Col>
        <Col sm={8}>
          <Container>
            <Jumbotron className="pt-2">
              <DataPanel />
            </Jumbotron>
          </Container>
        </Col>
      </Row>
      </div>
      <footer className="py-4 bg-dark text-white-50">
        <div class="container text-center inner">
          <small>Warning: This Application was designed for one person use. Concurrent use by several clients is not provided</small>
        </div>
      </footer>
    </div>
    
  )
}

export default App
