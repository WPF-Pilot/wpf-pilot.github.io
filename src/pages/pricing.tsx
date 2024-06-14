import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";

export default function PricingPage(): JSX.Element {
  return (
    <Layout description="WPF Pilot Commercial License">
      <header className={clsx("hero hero--primary", styles.heroBanner)}>
        <div className="container">
          <div>
            <div className={styles.heroSubtitle}>
              <div style={{ fontWeight: 700 }}>
                WPF Pilot Commercial Use License
              </div>
            </div>
          </div>
        </div>
      </header>

      <main>
        <div className="container">
          <div
            className="row"
            style={{ fontWeight: 700, marginTop: "2rem", marginBottom: "1rem" }}
          >
            If you are consuming any WPF Pilot libraries as a Direct Package
            Dependency for usage in Closed Source software in the capacity of a
            For-profit company/individual with more than $250k USD annual gross
            revenue you must purchase a WPF Pilot Commercial License. Our
            Commercial Use License gives you all the freedoms of our Open Source
            License for all WPF Pilot libraries at a single price.
          </div>
          <div style={{ fontWeight: 700, marginBottom: "2rem" }}>
            ✔️ Create and deploy unlimited closed-source projects, and
            applications.
            <br />
            ✔️ Redistribute the compiled library, royalty free, with your
            applications.
          </div>
          <div>
            A WPF Pilot Commercial Use License is immediately granted upon
            donation of <b>$100 USD</b> to a charity of your choice and must be
            renewed once per year.
          </div>
          <div
            className="row"
            style={{ marginBottom: "2rem", fontWeight: 700, marginTop: "2rem" }}
          >
            <details>
              <summary>WPF Pilot Commercial Use License</summary>
              WPF Pilot hereby grants you a non-exclusive license to the WPF
              Pilot Software Libraries for .NET ("the Software").
              <br />
              <br />
              Do No Harm
              <br />
              By downloading or using the Software, the Licensee agrees not to
              utilize the software in a manner which is disparaging to WPF
              Pilot, and not to rent, lease or otherwise transfer rights to the
              Software.
              <br />
              <br />
              License Permissions
              <br />
              Grants the use of the Software by an unlimited number of
              developers to create and deploy closed-source software for
              unlimited end user organizations ("The Organization") in multiple
              locations. This license covers unlimited applications or projects.
              The Software may be deployed upon any number of machines for the
              end-use of The Organization. This license also intrinsically
              covers for development, staging and production servers for each
              project.
              <br />
              Grants the right to distribute the Software (without royalty) as
              part of packaged commercial products.
              <br />
              <br />
              License Fees
              <br />
              A. If you wish to use the Software in a production environment,
              you may download and use the Software for one year upon payment of
              the appropriate license fee as indicated on the pricing page in
              accordance with the terms and conditions of this Agreement.
              <br />
              B. If you wish to use the Software in a non-production
              environment, you may download and access the source and/or
              binaries at no charge solely for testing and evaluation purposes
              and in accordance with all license limitations and restrictions
              set forth in this Agreement.
              <br />
              <br />
              Ownership
              <br />
              WPF Pilot shall at all times retain ownership of the WPF Pilot
              Software Libraries and all subsequent copies.
              <br />
              <br />
              Copyright
              <br />
              Title, ownership rights, and intellectual property rights in and
              to the Software shall remain with WPF Pilot. The Software is
              protected by the international copyright laws. Title, ownership
              rights, and intellectual property rights in and to the content
              accessed through the Software is the property of the applicable
              content owner and may be protected by applicable copyright or
              other law. This License gives you no rights to such content.
              <br />
              <br />
              Limitation Of Liability
              <br />
              THIS SOFTWARE IS PROVIDED "AS IS," WITHOUT A WARRANTY OF ANY KIND.
              ALL EXPRESS OR IMPLIED CONDITIONS, REPRESENTATIONS AND WARRANTIES,
              INCLUDING ANY IMPLIED WARRANTY OF MERCHANTABILITY, FITNESS FOR A
              PARTICULAR PURPOSE OR NON-INFRINGEMENT, ARE HEREBY EXCLUDED. WPF
              Pilot AND ITS LICENSORS SHALL NOT BE LIABLE FOR ANY DAMAGES
              SUFFERED BY LICENSEE AS A RESULT OF USING, MODIFYING OR
              DISTRIBUTING THE SOFTWARE OR ITS DERIVATIVES. IN NO EVENT WILL WPF
              Pilot OR ITS LICENSORS BE LIABLE FOR ANY LOST REVENUE, PROFIT OR
              DATA, OR FOR DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL, INCIDENTAL
              OR PUNITIVE DAMAGES, HOWEVER CAUSED AND REGARDLESS OF THE THEORY
              OF LIABILITY, ARISING OUT OF THE USE OF OR INABILITY TO USE
              SOFTWARE, EVEN IF WPF Pilot HAS BEEN ADVISED OF THE POSSIBILITY OF
              SUCH DAMAGES.
              <br />
            </details>
          </div>
        </div>
      </main>
    </Layout>
  );
}
