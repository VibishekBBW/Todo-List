import './App.css';
import React, { useState } from 'react';
import { Col, Container, Form, Row, Button, ButtonGroup, Modal, FormControl } from "react-bootstrap";
import moment from 'moment';
import "bootstrap/dist/css/bootstrap.min.css";



function App() {
    const [todos, setTodos] = useState([]);
    const [value, setValue] = useState('');
    const [filter, setFilter] = useState("");
    const [todoFaellig, setTodoFaellig] = useState('');
    const today = moment().format("DD.MM.yyyy");
    const [bem, setBem] = useState("");
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const handleChange = event => {
        setValue(event.target.value);
        event.preventDefault();
    }

    const handleSubmit = event => {
        setTodos(todos.concat({ text: value, status: "offen", date: todoFaellig, urgency: "wichtig" }));
        event.preventDefault();
    }

    const handleBemerkung = event => {
        setBem({ bem });
        event.preventDefault();
    }

    const handleChangeBem = event => {
        setBem(bem);
        event.preventDefault();
    }


    const handleRemove = idx => {
        setTodos(todos.filter((todo, i) => i !== idx));
    };

    const handleRemoveAll = event => {
        setTodos([]);
    }

    const handleStatus = (event, idx) => {
        let stats = [...todos];
        stats[idx].status = (stats[idx].status === "offen") ? "erledigt" : "offen";
        setTodos(stats);
    }

    function handleFilter(e) {
        setFilter(e.target.id);
    }

    const handleUrgency = (event, idx) => {
        let stats = [...todos];
        stats[idx].urgency = (stats[idx].urgency === "sehr wichtig") ? "wichtig" : "nicht wichtig";
        setTodos(stats);
    }

    function Bemerkung() {

        return (
            <>
                <Button size="sm" variant="primary" onClick={handleShow}>
                    Bemerkung
                </Button>

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Bemerkung hinzufügen</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <label htmlFor="recipient-name" className="col-form-label">Bemerkung: </label>
                            <textarea onChange={handleChangeBem} className="form-control" id="message-text">{bem}</textarea>
                        </div>
                        {/*
                            <div>
                                <label htmlFor="recipient-name" className="col-form-label">Status: </label>
                                <input type="text" value={" Status: " + (todo.status)} class="form-control"/>
                            </div>
                            */}

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>Schliessen</Button>
                        <Button onSubmit={handleBemerkung} variant="primary">Speichern</Button>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }










    return (
        <Container>
            <Col>
                <h1 className="boldh">TodoListe:</h1>
            </Col>
            <Col>
                <form onSubmit={handleSubmit}>

                    <Form.Control type="text" value={value} onChange={handleChange} placeholder="z.B Kochen" />
                    <input type="date" value="Datum" onChange={(event) => setTodoFaellig(event.target.value)} />
                    <Button size="sm" variant="success" type="submit">Hinzufügen</Button>
                    <br></br>
                    <br></br>
                    <br></br>


                    <ButtonGroup size="sm" onClick={e => handleFilter(e)}>
                        <Button id={""} onclick={e => setFilter("")}>Alle</Button>
                        <Button id={"erledigt"} onclick={e => setFilter("erledigt")}>Offen</Button>
                        <Button id={"offen"} onclick={e => setFilter("offen")}>Erledigt</Button>
                        <Button id={"favoriten"} onClick={e => setFilter("favoriten")}>Favoriten</Button>
                    </ButtonGroup>


                </form>
            </Col>
            {todos.filter(todo => todo.status !== filter).map((todo, idx) =>
                <Row className="outline" key={idx}>

                    <Col>
                        <br />
                        <h4>{todo.text}</h4>
                        {" Status: " + (todo.status)}
                        <br />
                        Erstellt:  {today}
                        <br />
                        Fällig am: {todo.date}
                        <br />
                        {"Dringlichkeit: " + (todo.urgency)}



                        <div className="float-right" >

                            <Button size="sm" variant="info" onClick={(e) => handleStatus(e, idx)}>{todo.status}</Button>
                            <Button size="sm" variant="danger" type="button" onClick={() => handleRemove(idx)}>delete</Button>
                            {console.log(todo.status + " " + filter)}
                        </div>
                        <br />
                        <div className="float-lg-left"><Bemerkung /></div>




                    </Col>
                </Row>)}
            <br />
            <br />
            <br />
            <Button className="footer" size="sm" variant="danger" type="button" onClick={() => handleRemoveAll()}>Delete all</Button>
        </Container>

    );
}

export default App;

