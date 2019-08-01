import React from 'react';
import {Button, Card, CardHeader} from "shards-react";

class Projects extends React.Component{
    handleClick(){
        var data = {title: 'posting',
                    startDate: '2000-01-01',
                    endDate: '2002-01-01',
                    description: 'test description',
                    author: 'Jeremy Ng Cheng Hin'};
        fetch('http://localhost:3001/projects/add',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    }


    render(){
        return (
            <Card>
                <CardHeader>This is the Projects Page</CardHeader>
                <Button onClick={this.handleClick}>Click Me to POST data</Button>
            </Card>
        );
    }
}

export default Projects;