"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { trackEvent } from "@/lib/track";

const portfolioItems: Array<[string, Array<[string, string, string]>]> = [
  ["CORE SOLUTIONS", [["SERVICES", "Two ways to work with us", "/services"], ["TACTICAL RETAINER", "Build the model and the team. Our main engagement.", "/services/tactical-retainer"], ["MILESTONE SPRINT", "4 weeks, existing model", "/services/milestone-sprint"]]],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [portfolioOpen, setPortfolioOpen] = useState(false);

  return (
    <header className="syn-nav">
      <div className="syn-nav-inner">
        <Link href="/" className="syn-logo" aria-label="Synobotix home">
          <Image src="/logo.svg" alt="Synobotix" width={34} height={34} unoptimized />
        </Link>
        <nav className={menuOpen ? "is-open" : ""}>
          <div className="syn-portfolio-menu" onMouseEnter={() => setPortfolioOpen(true)} onMouseLeave={() => setPortfolioOpen(false)}>
            <button type="button" aria-expanded={portfolioOpen} onClick={() => setPortfolioOpen(!portfolioOpen)}>SERVICES <ChevronDown size={12} /></button>
            <div className={`syn-portfolio-popover${portfolioOpen ? " is-open" : ""}`}>
              {portfolioItems.map(([heading, items]) => <div key={heading}>
                <p>{heading}</p>
                {items.map(([title, description, href]) => <Link href={href} key={title} onClick={() => setPortfolioOpen(false)}><i /><span><strong>{title}</strong><small>{description}</small></span></Link>)}
              </div>)}
            </div>
          </div>
          <a href="#work" onClick={() => setMenuOpen(false)}>CASE STUDIES</a>
          <Link href="/about" onClick={() => setMenuOpen(false)}>ABOUT</Link>
          <Link href="/team" onClick={() => setMenuOpen(false)}>TEAM</Link>
          <Link href="/careers" onClick={() => setMenuOpen(false)}>CAREERS</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>CONTACT</Link>
        </nav>
        <a href="https://calendly.com/remiboivin021/diagnostic" target="_blank" rel="noreferrer" className="syn-nav-cta" onClick={() => trackEvent({ event: "contact_page_view", source: "navbar" })}>BOOK A REVIEW</a>
        <button type="button" className="syn-nav-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
      </div>
    </header>
  );
}
