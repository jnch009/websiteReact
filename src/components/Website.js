import React from 'react';
import { Button,ButtonGroup,Breadcrumb, BreadcrumbItem } from "shards-react";
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';

function Website() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>About</BreadcrumbItem>
      <BreadcrumbItem>Projects</BreadcrumbItem>
      <BreadcrumbItem>Blog</BreadcrumbItem>
      <BreadcrumbItem>What's New</BreadcrumbItem>
      <ButtonGroup className="btnGrp" size="small">
        <Button>1</Button>
        <Button>2</Button>
        <Button>3</Button>
      </ButtonGroup>
    </Breadcrumb>
  );
}

export default Website;
