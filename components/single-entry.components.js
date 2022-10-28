import React,{useState, useEffect} from 'react';

import 'bootstrap/dist/css/bootstrap.css'

import {Button, Card, Row, Col} from 'react-bootstrap'

const Entry = ({entryData, setChangePrice, deleteSingleEntry, setChangeEntry})=>{
    return(
        <Card>
            <Row>
                <Col>Client:{entryData!==undefined && entryData.client}</Col>
                <Col>Phone:{entryData!==undefined && entryData.phone}</Col>
                <Col>Device:{entryData!==undefined && entryData.device}</Col>
                <Col>Price:{entryData!==undefined && entryData.price}</Col>
                <Col><Button onClick={()=> deleteSingleEntry(entryData._id)}>delete entry</Button></Col>
                <Col><Button onClick={()=> changePrice()}>change price</Button></Col>
                <Col><Button onClick={()=> changeEntry()}>change entry</Button></Col>
            </Row>
        </Card>
    )

    function changePrice(){
        setChangePrice(
            {
                "change": true,
                "id":entryData._id
            }
        )
    }

    function changeEntry(){
        setChangeEntry(
            {
                "change":true,
                "id":entryData._id
            }
        )
    }


}

export default Entry
