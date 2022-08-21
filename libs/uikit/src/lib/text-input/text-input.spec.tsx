import { render } from "@testing-library/react";

import TextInput from "./text-input";

describe("TextInput", () => {
  it("should render successfully", () => {
    const { baseElement } = render(<TextInput id="some-id" label="email" />);
    expect(baseElement).toBeTruthy();
  });
});
