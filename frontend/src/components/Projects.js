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
                    this.setState({
                        projects: result
                    })
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

    monthString(monthIndex){
        var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        return (months[monthIndex]);
    }

    render(){
        this.state.projects.forEach(p => {
            var newDate = p;
            var startDate = new Date(newDate.StartDate);
            var startDateMonth = startDate.getMonth();
            var startDateYear = startDate.getFullYear();
            var startDateString = this.monthString(startDateMonth)+" "+startDateYear;
            newDate.StartDate = startDateString;

            var endDate = new Date(p.EndDate);
            var endDateMonth = endDate.getMonth();
            var endDateYear = endDate.getFullYear();
            var endDateString = this.monthString(endDateMonth)+" "+endDateYear;
            newDate.EndDate = endDateString;
        })

        return (
            <div> 
                <Button>Add a new project</Button>
                {this.state.projects.map(project => (
                    <div>
                        <br/>
                        <Card>
                            <CardHeader>{project.Title}<br/>{project.StartDate} ― {project.EndDate}</CardHeader>
                            <CardBody>{project.Description.split('\\n').map(x => (
                                <div>{x}<br/></div>
                            ))}</CardBody>
                            <CardFooter>{project.Author}</CardFooter>
                        </Card>
                    </div>
                ))}
            </div>
        );
    }
}

export default Projects;