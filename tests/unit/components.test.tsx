import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import type { IconName } from "@/types/icon";

/**
 * Component behaviour that a text-only assertion would miss.
 *
 * The field lessons record four visual bugs shipping through a fully green
 * pipeline because every assertion was text-based or ran in a single theme. The
 * checks here are the ones that are still cheap: what a link opens, what an icon
 * announces, what a disclosure reports, and what a status badge says.
 */

function renderWithLanguage(ui: React.ReactElement) {
  return render(<LanguageProvider>{ui}</LanguageProvider>);
}

describe("Button", () => {
  it("renders an anchor when given an href", () => {
    render(<Button href="#contact">Contact</Button>);

    const link = screen.getByRole("link", { name: "Contact" });
    expect(link).toHaveAttribute("href", "#contact");
    expect(link).not.toHaveAttribute("target");
  });

  it("opens an external link safely", () => {
    render(<Button href="https://github.com/EvertonSt">GitHub</Button>);

    const link = screen.getByRole("link", { name: "GitHub" });
    // `noopener` stops the opened page reaching back through window.opener.
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("treats an absolute URL as external even without the flag", () => {
    render(<Button href="https://example.invalid">Out</Button>);

    expect(screen.getByRole("link", { name: "Out" })).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("respects an explicit internal link", () => {
    render(
      <Button href="https://example.invalid" external={false}>
        Internal
      </Button>
    );

    expect(screen.getByRole("link", { name: "Internal" })).not.toHaveAttribute("target");
  });

  it("renders a real button, not a link, when there is no href", () => {
    render(<Button onClick={() => undefined}>Print</Button>);

    const button = screen.getByRole("button", { name: "Print" });
    expect(button.tagName).toBe("BUTTON");
    expect(button).toHaveAttribute("type", "button");
  });

  it("calls onClick when pressed", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);

    await user.click(screen.getByRole("button", { name: "Go" }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies the variant and size classes", () => {
    render(
      <Button href="#x" variant="secondary" size="lg">
        Styled
      </Button>
    );

    const link = screen.getByRole("link", { name: "Styled" });
    expect(link.className).toContain("btn--secondary");
    expect(link.className).toContain("btn--lg");
  });
});

describe("Icon", () => {
  const names: IconName[] = [
    "github",
    "linkedin",
    "npm",
    "external",
    "live",
    "mail",
    "download",
    "print",
    "document",
    "arrow",
    "menu",
    "close",
    "sun",
    "moon",
    "gauge",
    "beaker",
    "shield",
    "search",
    "layers",
    "package",
    "globe",
    "clock",
    "check",
  ];

  it.each(names)("renders %s as a decorative svg", (name) => {
    const { container } = render(<Icon name={name} />);
    const svg = container.querySelector("svg");

    expect(svg).not.toBeNull();
    // Icons sit next to a text label or inside a named control. Announcing
    // "external link icon" after every link is noise.
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveAttribute("focusable", "false");
    expect(svg).toHaveAttribute("role", "presentation");
  });

  it("draws something for every icon name", () => {
    for (const name of names) {
      const { container } = render(<Icon name={name} />);
      expect(container.querySelector("svg")?.children.length, `${name} has no path`).toBeGreaterThan(0);
    }
  });

  it("honours the requested size", () => {
    const { container } = render(<Icon name="github" size={32} />);
    const svg = container.querySelector("svg");

    expect(svg).toHaveAttribute("width", "32");
    expect(svg).toHaveAttribute("height", "32");
  });
});

describe("StatusBadge", () => {
  it("always states the status in words, not only as a colour", () => {
    renderWithLanguage(<StatusBadge status="live" />);

    // A visitor who cannot distinguish the dot colours still gets the answer.
    expect(screen.getByText("In production")).toBeInTheDocument();
  });

  it("adds the explanation when asked for detail", () => {
    renderWithLanguage(<StatusBadge status="launching-october" showDetail />);

    expect(screen.getByText("Launching October 2026")).toBeInTheDocument();
    expect(screen.getByText(/Public launch 12 October 2026/)).toBeInTheDocument();
  });

  it("marks the dot decorative so the colour is not announced as content", () => {
    const { container } = renderWithLanguage(<StatusBadge status="demo" />);
    const dot = container.querySelector(".status-badge__dot");

    expect(dot).toHaveAttribute("aria-hidden", "true");
  });

  it("renders a different label per status", () => {
    const { rerender } = renderWithLanguage(<StatusBadge status="demo" />);
    expect(screen.getByText("Demo data")).toBeInTheDocument();

    rerender(
      <LanguageProvider>
        <StatusBadge status="in-development" />
      </LanguageProvider>
    );
    expect(screen.getByText("In development")).toBeInTheDocument();
  });
});

describe("SectionHeading", () => {
  it("ties the heading to the section that labels it", () => {
    render(<SectionHeading id="work-title" title="Selected work" subtitle="Five systems" />);

    const heading = screen.getByRole("heading", { name: "Selected work" });
    // A region with no accessible name is announced only as "region".
    expect(heading).toHaveAttribute("id", "work-title");
  });

  it("omits the subtitle element when there is none", () => {
    const { container } = render(<SectionHeading title="About" />);

    expect(container.querySelector(".section-heading__subtitle")).toBeNull();
  });

  it("renders the subtitle when given one", () => {
    render(<SectionHeading title="About" subtitle="Where the work was built" />);

    const wrapper = screen.getByRole("heading", { name: "About" }).parentElement;
    expect(within(wrapper as HTMLElement).getByText("Where the work was built")).toBeInTheDocument();
  });
});
