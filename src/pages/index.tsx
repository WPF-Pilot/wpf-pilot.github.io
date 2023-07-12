import React from 'react';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

export default function IndexPage(): JSX.Element {
  return (
    <Layout description="Next gen WPF automation testing">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className={styles.heroTitle} style={{ display: 'flex', alignItems: 'center'}}><img src={useBaseUrl('/img/logo-full.png')} style={{ marginRight: '28px' }} className={styles.bannerLogo} />
          <div>
            <span style={{color: "rgb(80, 250, 123)"}}>WPF</span> Pilot
            <div className={styles.heroSubtitle}>
              <div>
                Next generation WPF testing.
              </div>
              <div className={styles.buttons} style={{ paddingTop: '14px', display: 'flex' }}>
                <a className={styles.button} id="get-started" href="/docs/tutorial" target="_blank">
                  Get started
                </a>
              </div>
            </div>
          </div>
          </h1>
        </div>
      </header>

      <main>
        <div className="container">
          <div className="row" style={{ marginBottom: '7rem' }}>            
            <div className="col col--6" style={{ marginTop: '3rem' }}>
              <h3 style={{ fontSize: '3rem', lineHeight: 1.2, fontWeight: 800 }}>Works out of the box</h3>
              <p style={{ fontSize: '1rem', lineHeight: 1.5, fontWeight: 400 }}>
                No third party installers or config required. Install the package and start writing tests. Every test framework is supported. Actions are streamed directly to the app for blazingly fast execution.
              </p>
            </div>
            <div className="col col--6" style={{marginTop: '3rem'}}>
              <h2></h2>
              <p>
                <CodeBlock className='language-powershell'>
                  PM &gt; Install-Package WpfPilot
                </CodeBlock>
              </p>
              <p>
                <CodeBlock className='language-csharp'>
                  {codeBlock1}
                </CodeBlock>
              </p>
            </div>
            
            <div className="col col--6" style={{marginTop: '3rem'}}>
              <h2></h2>
              <p></p>
            </div>
            <div className="col col--6" style={{marginTop: '3rem'}}>
              <h2></h2>
              <p></p>
            </div>

            <div className="col col--6" style={{marginTop: '3rem'}}>
              <h2></h2>
              <p>
                <CodeBlock className='language-csharp'>{codeBlock2}</CodeBlock>
              </p>
            </div>
            <div className="col col--6" style={{marginTop: '3rem'}}>
              <h3 style={{ fontSize: '3rem', lineHeight: 1.2, fontWeight: 800 }}>Minimal yet powerful API</h3>
              <p>
                There are only <b>four</b> core classes to learn. The API is designed to be simple and intuitive. The API is also extensible, allowing you to create your own actions.
              </p>
            </div>

            <div className="col col--6" style={{marginTop: '3rem'}}>
              <h2></h2>
              <p></p>
            </div>
            <div className="col col--6" style={{marginTop: '3rem'}}>
              <h2></h2>
              <p></p>
            </div>

            <div className="col col--6" style={{marginTop: '3rem'}}>
              <h3 style={{ fontSize: '3rem', lineHeight: 1.2, fontWeight: 800 }}>Try it out for free</h3>
              <p style={{ fontSize: '1rem', lineHeight: 1.5, fontWeight: 400 }}>
                Catch bugs before they reach production. WPF Pilot is free for open source projects.
              </p>
              <div style={{ display: 'inline-flex' }}>
                <a className={styles.button} href="/pricing" target="_blank">
                  Enterprise License
                </a>
                <span style={{ display: 'flex', alignItems: 'center', marginLeft: '1rem' }}>
                  *Apache v2 for open source.
                </span>
              </div>
            </div>
            <div className="col col--6" style={{marginTop: '3rem'}}>
              <h2></h2>
              <div>
                <img src={useBaseUrl('/img/diagram.gif')} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

const codeBlock1 = `using WpfPilot;

void UserProfileTest()
{
  using var appDriver = AppDriver.Launch("../bin/Debug/MyCoolApp.exe");
  appDriver.GetElement(x => x["Name"] == "UsernameInput")
    .Type("Hello World");
  appDriver.GetElement(x => x["Name"] == "SubmitButton")
    .Click();
  appDriver.GetElement(x => x["Name"] == "UsernameLabel")
    .Assert(x => x["Text"] == "Hello World");
}
`;

const codeBlock2 = `// \`AppDriver\` sets up the app and provides access to the UI.
using var appDriver = AppDriver.Launch("../bin/Debug/MyCoolApp.exe");
appDriver.RunCode(_ => MyCoolAppManager.ClearScreen());

// \`Element\` represents a UI element.
var element = appDriver.GetElement(x => x["Width"] > 400);
element.Click();
element.Focus();
element.Invoke<MyCustomControl>(x => x.DoAnimation());

// \`Primitive\` represents a property on the UI element.
var visibility = element["Visibility"];

// \`Keyboard\` simulates keyboard input.
appDriver.Keyboard.Type("Hello World");
`
