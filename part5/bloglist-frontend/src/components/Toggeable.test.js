import React from "react";
import "@testing-library/react";
import { render, fireEvent } from "@testing-library/react";
import Toggeable from "./Toggeable";

describe("<Toggeable />", () => {
  let component;
  beforeEach(() => {
    component = render(
      <Toggeable buttonLabel="show">
        <div className="testDiv" />
      </Toggeable>
    );
  });

  test("render its children", () => {
    expect(component.container.querySelector(".testDiv")).toBeDefined();
  });

  test("at start the children are not displayed", () => {
    const div = component.container.querySelector(".toggeableContent");

    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button the children is displayed", () => {
    const button = component.getByText("show");
    fireEvent.click(button);
    const div = component.container.querySelector(".toggeableContent");

    expect(div).not.toHaveStyle("display: none");
  });

  test("if the children is displayed, clicking the button again will hide it", () => {
    const showButton = component.getByText("show");
    fireEvent.click(showButton);

    const div = component.container.querySelector(".toggeableContent");
    expect(div).not.toHaveStyle("display: none");

    const cancelButton = component.getByText("cancel");
    fireEvent.click(cancelButton);

    expect(div).toHaveStyle("display: none");
  });
});
