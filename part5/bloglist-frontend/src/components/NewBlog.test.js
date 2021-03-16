import React from "react";
import "@testing-library/react";
import { render, fireEvent } from "@testing-library/react";
import NewBlog from "./NewBlog";

describe("<NewBlog />", () => {
  let component;
  let submitHandler = jest.fn();
  beforeEach(() => {
    component = render(<NewBlog handleNewBlogs={submitHandler} />);
  });

  test("NewBlog updates parent state and calls onSubmit", () => {
    let form = component.container.querySelector("form");
    let title = component.container.querySelector("input[name='title']");
    let author = component.container.querySelector("input[name='author']");
    let url = component.container.querySelector("input[name='url']");

    fireEvent.change(title, { target: { value: "Esto es todo" } });

    fireEvent.change(author, { target: { value: "Marcos" } });

    fireEvent.change(url, { target: { value: "something.com" } });

    fireEvent.submit(form);

    expect(submitHandler.mock.calls).toHaveLength(1);
    expect(submitHandler.mock.calls[0][0].title).toBe("Esto es todo");
  });
});
