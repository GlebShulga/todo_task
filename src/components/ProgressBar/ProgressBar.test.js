import React from "react";
import renderer from "react-test-renderer";
import { render } from "@testing-library/react";
import ProgressBar from "./ProgressBar";
import AppTest from "../../../tests/AppTest";

describe("<ProgressBar />", () => {
  it("should render component with default progress value 100", () => {
    const { getByTestId } = render(
      <AppTest>
        <ProgressBar />
      </AppTest>
    );

    const progressBar = getByTestId("ProgressBar");
    expect(progressBar.value).toBe(100);
  });
  it("ProgressBar snapshot", () => {
    const component = renderer.create(
      <AppTest>
        <ProgressBar />
      </AppTest>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
