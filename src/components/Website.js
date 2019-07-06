import React from 'react';
import { Breadcrumb, BreadcrumbItem } from "shards-react";

function Website() {
  return (
    <Breadcrumb>
      <BreadcrumbItem>Home</BreadcrumbItem>
      <BreadcrumbItem>About</BreadcrumbItem>
      <BreadcrumbItem>Projects</BreadcrumbItem>
      <BreadcrumbItem>Blog</BreadcrumbItem>
      <BreadcrumbItem>What's New</BreadcrumbItem>
    </Breadcrumb>
  );
}

export default Website;
