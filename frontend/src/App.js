import React from "react";
import { Layout, Menu } from "antd";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ComponentsList from "./components/ComponentList";
import VehiclesList from "./components/VehicleList";
import IssuesList from "./components/IssueList";
import ServicesList from "./components/ServiceList";
import RevenueSummary from "./components/RevenueSummery";
import CreateComponent from "./components/CreateComponent";
import CreateVehicle from "./components/CreateVehicle";
import CreateIssue from "./components/CreateIssue";
import CreateService from "./components/CreateService";

const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal">
            <Menu.Item key="1">
              <Link to="/components">Components</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/vehicles">Vehicles</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/issues">Issues</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/services">Services</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/revenue">Revenue</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="/create-component">Create Component</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="/create-vehicle">Create Vehicle</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/create-issue">Create Issue</Link>
            </Menu.Item>
            <Menu.Item key="9">
              <Link to="/create-service">Create Service</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "50px" }}>
          <Routes>
            <Route path="/" element={<ComponentsList />} />
            <Route path="/components" element={<ComponentsList />} />
            <Route path="/vehicles" element={<VehiclesList />} />
            <Route path="/issues" element={<IssuesList />} />
            <Route path="/services" element={<ServicesList />} />
            <Route path="/revenue" element={<RevenueSummary />} />
            <Route path="/create-component" element={<CreateComponent />} />
            <Route path="/create-vehicle" element={<CreateVehicle />} />
            <Route path="/create-issue" element={<CreateIssue />} />
            <Route path="/create-service" element={<CreateService />} />
          </Routes>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Vehicle Service Management System ©2024
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
