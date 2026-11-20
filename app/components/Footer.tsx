import Link from "next/link";

export default function Footer() {
  return (
    <footer className="syn-footer">
      <div className="syn-footer-inner">
        <div className="syn-footer-main">
          <div>
            <Link href="/" className="syn-logo">SYNO<span>BOTIX</span></Link>
            <p>An engineering agency for physical AI. We build the models behind real robots, deploy them on embedded compute, and bound them with a safety layer you can defend.</p>          </div>
          <div>
            <h3>OFFERS</h3>
            <Link href="/services/milestone-sprint">Milestone Sprint</Link>
            <Link href="/services/tactical-retainer">Tactical Retainer</Link>
            <Link href="/#safety">Safety layer review</Link>
            <Link href="/#contact">Technical due diligence</Link>
          </div>
          <div>
            <h3>AGENCY</h3>
            <Link href="/#capability">Capability</Link>
            <Link href="/#work">Selected work</Link>
            <Link href="/team">Who we are</Link>
            <Link href="/careers">Careers</Link>
          </div>
          <div>
            <h3>LEGAL</h3>
            <Link href="/mentions-legales">Mentions légales</Link>
            <Link href="/politique-confidentialite">Privacy policy</Link>
            <Link href="/#contact">Cookie policy</Link>
            <Link href="/#contact">Terms of service</Link>
            <Link href="/#contact">Export control notice</Link>
          </div>
        </div>
        <div className="syn-copyright">
          <span>© 2026 SYNOBOTIX. ALL RIGHTS RESERVED.</span>        </div>
      </div>
    </footer>
  );
}
