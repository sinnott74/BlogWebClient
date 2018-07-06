import React from "react";
import { shallow } from "enzyme";
import Spinner from "./index";

describe("Spinner", () => {
  it("renders without crashing", () => {
    shallow(<Spinner />);
  });

  it("has a default size of 48", () => {
    const wrapper = shallow(<Spinner />);
    const svg = wrapper.find("svg");
    expect(svg.prop("width")).toBe(48);
    expect(svg.prop("height")).toBe(48);
  });

  it("can change size", () => {
    const size = 32;
    const wrapper = shallow(<Spinner size={size} />);
    const svg = wrapper.find("svg");
    expect(svg.prop("width")).toBe(size);
    expect(svg.prop("height")).toBe(size);
  });
});
