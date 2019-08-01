import React from 'react';
import {Button, Card, CardHeader, CardBody, CardFooter} from "shards-react";

class Projects extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            projects: []
        };
    }
    
    componentDidMount(){
        fetch('http://localhost:3001/projects')
            .then(res => res.json())
            .then(
                (result) => {
                    result.map(p =>(
                        this.setState({
                            projects: this.state.projects.concat(p)
                        })
                    ));
                },
                (error) => {
                    console.log(error)
                }
            );
    }

    /* could be used in the future for add a button, but better suited for the blog page*/
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
        //const projects = this.state;
        return (
            <div> 
                {this.state.projects.map(project => (
                    <Card>
                        <CardHeader>{project.Title}<br/>{project.StartDate}-{project.EndDate}</CardHeader>
                        <CardBody>{project.Description.split('\\n').map(x => (
                            <div>{x}<br/></div>
                        ))}</CardBody>
                        <CardFooter>{project.Author}</CardFooter>
                    </Card>
                ))}
            </div>
        );
    }
}

export default Projects;