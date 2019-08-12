import React from 'react';
import Card from 'react-bootstrap/Card';

const KPI =(props)=>{
    return(
        <Card style={{ width: '14rem',direction:'rtl',boxShadow:'13px 13px 13px #eee' }}>
            <Card.Body>
                <Card.Title>{props.kpi}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{props.title}</Card.Subtitle>
                <Card.Text>
                {props.text}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default KPI;