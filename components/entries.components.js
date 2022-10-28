import React,{useState, useEffect} from 'react';

import axios from "axios";

import {Button, Form, Container, Modal} from 'react-bootstrap'

import Entry from './single-entry.components';

const Entries =() =>{

    const [entries, setEntries] = useState([])
    const [refreshData, setRefreshData] = useState(false)
    const [changeEntry, setChangeEntry] = useState({"change":false, "id":0})
    const [changePrice, setChangePrice] = useState({"change":false, "id":0})
    const [newPrice, setNewPrice] = useState(0)
    const [addNewEntry, setAddNewEntry] = useState(false)
    const [newEntry, setNewEntry] = useState({"client":"", "phone":"", "device":"", "price":0})

    useEffect(() => {
        getAllEntries();
    }, [])

    if(refreshData){
        setRefreshData(false);
        getAllEntries();
    }

    return(
        <div>
            <Container>
                <Button onClick={() => setAddNewEntry(true)} centred>New order</Button >
            </Container>
            <Container>
                {entries != null && entries.map((entry, i) =>(
                    <Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangePrice={setChangePrice} setChangeEntry={setChangeEntry} />
                ))}
            </Container>

            <Modal show={addNewEntry} onHide={()=> setAddNewEntry(false)} centred>
            <Modal.Header closeButton>
                <Modal.Title>Add Order Entry</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>client</Form.Label>
                    <Form.Control onChange={(event)=>{newEntry.client = event.target.value}}></Form.Control>
                    <Form.Label>phone</Form.Label>
                    <Form.Control onChange={(event)=>{newEntry.phone = event.target.value}}></Form.Control>
                    <Form.Label>device</Form.Label>
                    <Form.Control onChange={(event)=>{newEntry.device = event.target.value}}></Form.Control>
                    <Form.Label>price</Form.Label>
                    <Form.Control type='number' onChange={(event)=>{newEntry.price = event.target.value}}></Form.Control>
                </Form.Group>
                <Button onClick={()=> addSingleEntry()}>Add</Button>
                <Button onClick={()=> setAddNewEntry(false)}>Cancel</Button>
            </Modal.Body>
            </Modal>

            <Modal onShow={changePrice.change} onHide={() => setChangePrice({"change":false, "id":0})} centred>
            <Modal.Header closeButton>
                <Modal.Title>Change Price</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
                    <Form.Label>New Price</Form.Label>
                    <Form.Control onChange={(event)=>{setNewPrice(event.target.value)}}></Form.Control>
                </Form.Group>
                <Button onClick={()=> changeOnePrice()}>Change</Button>
                <Button onClick={()=> setChangePrice({"change":false,"id":0})}>Cancel</Button>

            </Modal.Body>
            </Modal>
            <Modal show={changeEntry.change} onHide={() => setChangeEntry({"change":false, "id":0})} centred>
                    <Modal.Header closeButton>
                    <Modal.Title>Change Entry</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <Form.Group>
                        <Form.Label>client</Form.Label>
                        <Form.Control onChange={(event)=>{newEntry.client = event.target.value}}></Form.Control>
                        <Form.Label>phone</Form.Label>
                        <Form.Control onChange={(event)=>{newEntry.phone = event.target.value}}></Form.Control>
                        <Form.Label>device</Form.Label>
                        <Form.Control onChange={(event)=>{newEntry.device = event.target.value}}></Form.Control>
                        <Form.Label>price</Form.Label>
                        <Form.Control type="number" onChange={(event)=>{newEntry.price = event.target.value}}></Form.Control>
                    </Form.Group>
                    <Button onClick={()=> changeSingleEntry()}>Change</Button>
                    <Button onClick={()=> setChangeEntry({"change":false,"id":0})}>Cancel</Button>
                    </Modal.Body>
            </Modal>
        </div>


    );
    


function changeOnePrice(){
    changePrice.change = false;
    var url = "http://localhost:8000/price/update/" + changePrice.id
    axios.put(url,{
        "price":newPrice
    })
    .then(response =>{
        console.log(response.status)
        if(response.status == 200){
            setRefreshData(true)
        }
    })

}


function changeSingleEntry(){
    changeEntry.change = false;
    var url = "http://localhost:8000/entry/update/" + changeEntry.id
    axios.put(url, newEntry)
    .then(response =>{
        if(response.status == 200){
            setRefreshData(true)
        }
    })
}

function addSingleEntry(){
    setAddNewEntry(false)
    var url = "http://localhost:8000/entry/create"
    axios.post(url, {
        "client":newEntry.client,
        "phone":newEntry.phone,
        "device":newEntry.device,
        "price":parseInt(newEntry.price),
    }).then(response=> {
        if(response.status == 200){
            setRefreshData(true)
        }
    })
}

function deleteSingleEntry(id){
    var url = "http:/localhost:8000/entry/delete/" + id
    axios.delete(url, {

    }).then(response =>{
        if (response.status == 200){
            setRefreshData(true)
        }
    })
}


function getAllEntries(){
    var url = "http:/localhost:8000/entries"
    axios.get(url, {
        responseType: 'json'
    }).then(response => {
        if(response.status==200){
            setEntries(response.data)
        }
    })

}

}

export default Entries