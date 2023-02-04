import { describe, expect, it } from "vitest";
import { Email } from "@styled-icons/material-outlined";
import { render } from "~test/utils";
import { TextField } from ".";

describe("<TextField />", () => {
  it('should render with Label', () => {
    const { getByLabelText } = render(<TextField label="Label" labelFor="Field" id="Field" />)

    expect(getByLabelText('Label')).toBeInTheDocument()
  })

  it('should render without Label', () => {
    const { queryByLabelText } = render(<TextField />)

    expect(queryByLabelText('Label')).not.toBeInTheDocument()
  })

  it('should render with placeholder', () => {
    const { getByPlaceholderText } = render(<TextField placeholder="hey you" />)

    expect(getByPlaceholderText('hey you')).toBeInTheDocument()
  })

  it('should render with icon', () => {
    const { getByTestId } = render(<TextField icon={<Email data-testid="icon" />} />)

    expect(getByTestId('icon')).toBeInTheDocument()
  })
});
