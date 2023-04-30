jest.mock("./createBookReview");

import $ from "jquery";
import createBookListItem from "./createBookListItem";
import createBookReview from "./createBookReview";
import { Book } from "./app";

describe("createBookListItem()", () => {
  const book: Book = {
    id: 1,
    title: "フロントエンド開発",
    author: "執筆太郎",
    overview: "フロントエンド開発をこれから始める方に最適な1冊です",
    image: "https://example.com/image.png",
    reviews: [
      {
        id: 1,
        username: "匿名ユーザー1",
        comment: "スムーズに開発することができました！",
        like: 12,
      },
      {
        id: 2,
        username: "匿名ユーザー2",
        comment: "楽しく読ませてもらいました。",
        like: 0,
      },
    ],
  };

  test("should return DOM element", () => {
    document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`;
    expect($(".book-list__item").length).toBe(1);
  });

  test("should match title & author", () => {
    document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`;
    expect($(".book-list__item__inner__info__title").text()).toBe(
      `${book.title}(${book.author})`
    );
  });

  test("should match overview", () => {
    document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`;
    expect($(".book-list__item__inner__info__overview").text()).toBe(
      book.overview
    );
  });

  test("should match image URL", () => {
    document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`;
    expect($(".book-list__item__inner__image").prop("src")).toBe(book.image);
  });

  test("should match review count", () => {
    document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`;
    expect($(".book-list__item__inner__info__comment__link").text()).toBe(
      `${book.reviews.length}件の感想・評価`
    );
  });

  test("should render review", () => {
    document.body.innerHTML = `<ul>${createBookListItem(book)}</ul>`;
    expect(createBookReview).toHaveBeenCalledTimes(book.reviews.length);
  });
});
