import { describe, expect, it } from "vitest";
import { AddShoppingCart } from "@styled-icons/material-outlined";
import { render } from "~test/utils";
import { Button } from ".";

describe("<Button />", () => {
  it("should render the medium size by default", () => {
    const { getByRole } = render(<Button>Buy now</Button>);

    const btn = getByRole("button", { name: /buy now/i });

    expect(btn).toBeInTheDocument();
    expect(btn).toHaveStyle({
      height: "4rem",
      padding: "0.8rem 3.2rem",
      "font-size": "1.4rem",
    });
  });

  it("should render the small size", () => {
    const { getByRole } = render(<Button size="small">Buy now</Button>);

    expect(getByRole("button", { name: /buy now/i })).toHaveStyle({
      height: "3rem",
      "font-size": "1.2rem",
    });
  });

  it("should render the large size", () => {
    const { getByRole } = render(<Button size="large">Buy now</Button>);

    expect(getByRole("button", { name: /buy now/i })).toHaveStyle({
      height: "5rem",
      padding: "0.8rem 4.8rem",
      "font-size": "1.6rem",
    });
  });

  it("should render an icon version", () => {
    const { getByText, getByTestId } = render(
      <Button icon={<AddShoppingCart data-testid="icon" />}>Buy now</Button>
    );

    expect(getByText(/buy now/i)).toBeInTheDocument();
    expect(getByTestId("icon")).toBeInTheDocument();
  });

  it("should render Button as a link", () => {
    const { getByRole } = render(
      <Button as="a" href="/link">
        Buy now
      </Button>
    );

    expect(getByRole("link", { name: /buy now/i })).toHaveAttribute(
      "href",
      "/link"
    );
  });
});
