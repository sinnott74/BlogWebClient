import React from "react";
import { shallow } from "enzyme";
import Toast from "./index";

describe("Toast", () => {
  it("renders without crashing", () => {
    shallow(<Toast />);
  });

  it("sets toast__opened class when showing", () => {
    const wrapper = shallow(<Toast showing={true} />);
    const toast = wrapper.find(".toast");
    expect(toast.hasClass("toast__opened")).toBe(true);
  });

  it("doesn't set toast__opened class when not showing", () => {
    const wrapper = shallow(<Toast showing={false} />);
    const toast = wrapper.find(".toast");
    expect(toast.hasClass("toast__opened")).toBe(false);
  });

  it("set the message", () => {
    const text = "Test";
    const wrapper = shallow(<Toast message={text} />);
    const message = wrapper.find(".toast__message");
    expect(message.text()).toBe(text);
  });

  it("calls handleCloseButtonClick when close button is clicked", done => {
    const handleCloseButtonClick = () => {
      done();
    };
    const wrapper = shallow(
      <Toast handleCloseButtonClick={handleCloseButtonClick} />
    );
    const button = wrapper.find(".toast__button");
    button.simulate("click");
  });
});
