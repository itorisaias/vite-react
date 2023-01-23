import { describe, expect, it } from "vitest";
import { Button } from ".";
import { render } from "~test/utils";

describe("<Button />", () => {
  it("should render the medium size by default", () => {
    const { getByRole, debug } = render(<Button>Buy now</Button>);

    const btn = getByRole("button", { name: /buy now/i });

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveStyle({
      height: "4rem",
      padding: "0.8rem 3.2rem",
      "font-size": "1.4rem",
    });
  });
});
