import { render, screen } from "@testing-library/react";

import { NavBar } from "./navbar";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("<NavBar />", () => {
  it("should render with the logo, navigation links and the primary CTA", () => {
    const { container } = render(<NavBar />);

    // Logo presente
    expect(screen.getByRole("img")).toBeInTheDocument();

    // Nav element + links principais
    expect(container.querySelector("nav")).toBeInTheDocument();
    expect(screen.getAllByText("Planos").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Serviços").length).toBeGreaterThan(0);

    // CTA "Falar com Corujão" (desktop + mobile)
    expect(screen.getAllByText("Falar com Corujão").length).toBeGreaterThan(0);
  });
});
