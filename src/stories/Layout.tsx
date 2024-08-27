import React from "react";
import { Col, Row, Text } from "../component";
import CodeView from "./CodeView";

const Layout = () => {
  return (
    <div>
      <Text weight="600" size="h3">Row & Col</Text>
      <br />
      <br />
      <Row responsive={[24, 24, 24, 24, 24]}>
        <Col span={12}>
          <div style={{ width: "100%", height: 150, background: "red" }}></div>
        </Col>
        <Col span={12}>
          <div
            style={{ width: "100%", height: 150, background: "yellow" }}
          ></div>
        </Col>
        <Col span={24}>
          <div
            style={{ width: "100%", height: 150, background: "green" }}
          ></div>
        </Col>
        <Col span={24}>
          <div style={{ width: "100%", height: 150, background: "cyan" }}></div>
        </Col>
      </Row>
      <CodeView
        code={`
            <Row responsive={[24, 24, 24, 24, 24]}>
                <Col span={12}>A</Col>
                <Col span={12}>B</Col>
                <Col span={24}>C</Col>
                <Col span={24}>D</Col>
            </Row>
            `}
      />
    </div>
  );
};

export default Layout;
