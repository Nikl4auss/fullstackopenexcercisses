import React from "react";
import "@testing-library/react";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog />", () => {
  let component;
  let likeHandler = jest.fn();
  let deleteHandler = jest.fn();
  let blog = {
    title: "Esto es todo",
    author: "Marcos",
    url: "Something",
    likes: 10,
  };
  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        handleUpdate={likeHandler}
        handleDelete={deleteHandler}
      />
    );
  });

  test("Initialy, only the title and author of the blog are displayed", () => {
    const tittleAndAuthor = component.getByText("Esto es todo Marcos");

    expect(tittleAndAuthor).toBeDefined();
  });

  test("When the show more button is clicked, title, author, url and likes are displayed", () => {
    const showMoreButton = component.getByText("show more");
    fireEvent.click(showMoreButton);

    const title = component.getByText("Esto es todo");
    const author = component.getByText("Marcos");
    const url = component.getByText("Something");
    const likes = component.getByText("likes 10");

    expect(title && author && url && likes).toBeDefined();
  });

  test("when the show more button is clicked, the like button is displayed and and can be clicked", () => {
    const showMoreButton = component.getByText("show more");
    fireEvent.click(showMoreButton);
    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    expect(likeHandler.mock.calls).toHaveLength(1);
  });
});
