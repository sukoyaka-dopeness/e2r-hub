import { useState } from 'react'
import type { ReactNode } from 'react'
import './App.css'

type Locale = 'en' | 'ja'

const links = {
  narrativeLine: 'https://sukoyaka-dopeness.github.io/e2r-narrative-line/',
  liaisonScape: 'https://sukoyaka-dopeness.github.io/e2r-liaison-scape/',
  narrativeGuideEn: 'https://github.com/sukoyaka-dopeness/e2r-narrative-line/blob/main/docs/user-guide-en.md',
  narrativeGuideJa: 'https://github.com/sukoyaka-dopeness/e2r-narrative-line/blob/main/docs/user-guide-ja.md',
  liaisonGuideEn: 'https://github.com/sukoyaka-dopeness/e2r-liaison-scape/blob/main/docs/user-guide-en.md',
  liaisonGuideJa: 'https://github.com/sukoyaka-dopeness/e2r-liaison-scape/blob/main/docs/user-guide-ja.md',
  specification: 'https://github.com/sukoyaka-dopeness/e2r-spec',
  specificationDocs: 'https://github.com/sukoyaka-dopeness/e2r-spec/tree/main/docs',
  validator: 'https://github.com/sukoyaka-dopeness/e2r-validator',
  berlinWall: 'https://github.com/sukoyaka-dopeness/e2r-narrative-line/blob/main/src/sample/berlin-wall-history.en.e2r.json',
  lighthouse: 'https://github.com/sukoyaka-dopeness/e2r-liaison-scape/blob/main/public/lighthouse-restoration-demo.en.e2r.json',
  apollo: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/examples/apollo-11-mission.en.e2r.json',
  ashenCrown: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/examples/ashen-crown.en.e2r.json',
  titanic: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/examples/titanic-final-voyage.en.e2r.json',
}

const copy = {
  en: {
    ecosystem: 'E2R application ecosystem',
    hero: 'One dataset,\nmany ways\nto understand it.',
    heroIntro: 'Choose the application that fits what you want to do.',
    choose: 'What do you want to do?',
    timeline: 'Timeline',
    relationshipDiagram: 'Relationship diagram',
    narrativeAction: 'View and edit a timeline',
    liaisonAction: 'View and edit a relationship diagram',
    narrativeTitle: 'NarrativeLine',
    narrativeDescription: 'View and edit events over time.',
    liaisonTitle: 'LiaisonScape',
    liaisonDescription: 'View and edit relationships between entities.',
    mobileNote: 'You can view on smartphones. Editing is designed for desktop.',
    tryIt: 'Try real examples',
    berlinTitle: 'History of the Berlin Wall',
    berlinDescription: 'Explore historical events through both time and relationships.',
    apolloDescription: 'A representative sample that can be viewed and edited in multiple E2R applications.',
    lighthouseDescription: 'A fictional sample about people restoring an old lighthouse.',
    ashenCrownDescription: 'A creative-writing sample about ten characters, alliances, rivalries, and secrets in a fictional kingdom.',
    ashenCrownTitle: 'The Ashen Crown',
    titanicTitle: 'Titanic: Final Voyage',
    titanicDescription: "A historical sample following Titanic's final voyage through people, ships, relationships, and events.",
    openNarrative: 'Open NarrativeLine',
    openLiaison: 'Open LiaisonScape',
    viewDataset: 'View Dataset JSON',
    otherSamples: 'Sample Datasets',
    source: 'Dataset source',
    apollo: 'Apollo 11 Mission',
    lighthouse: 'Lighthouse Restoration Project',
    whatIs: 'What is E2R?',
    whatIsIntro: 'E2R uses three key terms: Entity (something that exists), Event (something that happens), and Relation (a relationship).',
    whatIsLead: 'E2R is a shared data format for\nthings that exist, things that happen,\nand the relationships between them.',
    whatIsBody: 'The same E2R Dataset can be used in different applications: a timeline, a relationship diagram, genealogy, investigation boards, knowledge organization, and creative-authoring tools. Applications do not need to become the same kind of tool to use compatible data.',
    whatIsJson: 'Because E2R Datasets use JSON, they are easy to inspect, transform, and use with tools such as LLMs.',
    whatIsValidation: 'Data generated outside E2R-compatible applications is not guaranteed to conform to E2R, so it should be checked with the Validator and reviewed.',
    whatIsPoint1: 'The format lets different applications share descriptions of entities, events, and relationships.',
    whatIsPoint2: 'The same E2R Dataset can be used in a timeline, relationship diagram, family tree, research dashboard, knowledge organization, creative-authoring tools, and other applications. Applications do not need to become the same kind of tool to use compatible data.',
    whatIsPoint3: 'Anyone can build an application that supports the E2R format.',
    whatIsPoint4: 'Because E2R Datasets use JSON, they are easy to inspect, transform, and use with tools such as LLMs. Data generated outside E2R-compatible applications is not guaranteed to conform to E2R, so it should be checked with the Validator and reviewed by a person or application.',
    learnSpec: 'Learn about the E2R Specification',
    tools: 'Tools and resources',
    validator: 'E2R Validator',
    validatorDescription: 'Validates E2R Datasets. It is currently available as a CLI and JavaScript library, not as a browser tool on the Hub.',
    credits: 'Credits',
    close: 'Close',
    createdBy: 'Created by sukoyaka-dopeness',
    createdDate: 'Created 2026-08',
    gratitude: 'With gratitude to all the AI systems that contributed to this project.',
    specificationRepo: 'E2R specification repository',
  },
  ja: {
    ecosystem: 'E2R アプリケーションエコシステム',
    hero: 'ひとつのDatasetを、\nいろいろな視点で、\n見てみよう。',
    heroIntro: 'やりたいことに合ったアプリを選べます。',
    choose: '何をしたいですか？',
    timeline: '年表',
    relationshipDiagram: '相関図',
    narrativeAction: '年表を見たり、作ったり',
    liaisonAction: '相関図を見たり、作ったり',
    narrativeTitle: 'NarrativeLine',
    narrativeDescription: 'イベントの時間の流れを見たり、編集したりできます。',
    liaisonTitle: 'LiaisonScape',
    liaisonDescription: 'エンティティ同士の関係を見たり、編集したりできます。',
    mobileNote: 'スマートフォンでは閲覧できます。編集はPC向けです。',
    tryIt: '実際の例を見る',
    berlinTitle: 'ベルリンの壁の歴史',
    berlinDescription: '歴史上のイベントを、時間と関係の両方から見られるサンプルです。',
    apolloDescription: '複数のE2Rアプリで閲覧、編集できる代表的なサンプルです。',
    lighthouseDescription: '架空の古い灯台を修復する人々を描いたサンプルです。',
    ashenCrownDescription: '架空の王国を舞台に、10人の人物とその歴史、同盟、対立、秘密を描く創作サンプルです。',
    ashenCrownTitle: '灰冠の王国',
    titanicTitle: 'タイタニック号 最後の航海',
    titanicDescription: 'タイタニック号の最後の航海を、人々、船、関係、出来事からたどる歴史サンプルです。',
    openNarrative: 'NarrativeLineを開く',
    openLiaison: 'LiaisonScapeを開く',
    viewDataset: 'Dataset JSONを見る',
    otherSamples: 'サンプルデータセット',
    source: 'Datasetのソース',
    apollo: 'アポロ11号ミッション',
    lighthouse: '灯台修復プロジェクト',
    whatIs: 'E2Rとは？',
    whatIsIntro: 'E2Rでは、「エンティティ（存在するもの）」「イベント（できごと）」「リレーション（関係）」という3つの言葉を使います。',
    whatIsLead: 'E2Rは、存在するもの、起きたこと、\nそれらの関係を記録するための\n共通データ形式です。',
    whatIsBody: '同じE2Rデータセットを、年表、関係図、家系図、調査ボード、知識整理、創作支援など、さまざまなアプリケーションで利用できます。すべてのアプリケーションが同じものになるのではなく、互換性のあるアプリケーションを作れるように設計されています。',
    whatIsJson: 'DatasetはJSONなので、確認や変換、LLMなどのツールによる支援にも使いやすい形式です。',
    whatIsValidation: '対応アプリ以外で生成されたデータが必ずE2Rに適合するとは限らないため、Validatorによる検証と、人やアプリケーションによる内容の確認が必要です。',
    whatIsPoint1: '存在するもの、起きたこと、関係を、異なるアプリケーションで共有して扱うための形式です。',
    whatIsPoint2: '同じE2Rデータセットを、年表、相関図、家系図、調査ボード、知識整理、創作支援など、さまざまなアプリケーションで利用できます。',
    whatIsPoint3: '誰でもE2R形式に対応したアプリケーションを作れます。',
    whatIsPoint4: 'DatasetはJSONなので、確認、変換、LLMなどのツールによる支援にも使いやすい形式です。生成されたデータが必ずE2Rに適合するとは限らないため、検証と確認が必要です。',
    learnSpec: 'E2R Specificationを読む',
    tools: 'ツールとリソース',
    validator: 'E2R Validator',
    validatorDescription: 'E2Rデータセットを検証します。現在はCLIとJavaScriptライブラリとして提供されており、Hub上のブラウザツールではありません。',
    credits: 'クレジット',
    close: '閉じる',
    createdBy: 'Created by sukoyaka-dopeness',
    createdDate: 'Created 2026-08',
    gratitude: 'With gratitude to all the AI systems that contributed to this project.',
    specificationRepo: 'E2R specification repository',
  },
} as const

const landingCopy = {
  en: {
    guide: 'User Guide',
    narrativeDescription: 'View and edit events over time.',
    sampleIntro: 'Explore sample Datasets before choosing an application. The source link opens the JSON; it does not create a Hub handoff link.',
    documentation: 'Documentation',
    documentationIntro: 'Learn how to use each application and how E2R Datasets are structured.',
    specificationDocs: 'E2R documentation',
  },
  ja: {
    guide: 'ユーザーガイド',
    narrativeDescription: 'できごとを時間順に見たり、編集したりできます。',
    sampleIntro: 'アプリを選ぶ前に、サンプルデータセットを見てみましょう。ソースリンクはJSONを開くもので、HubのHandoffリンクを生成するものではありません。',
    documentation: 'ドキュメント',
    documentationIntro: '各アプリケーションの使い方とE2Rデータセットの構造を確認できます。',
    specificationDocs: 'E2Rドキュメント',
  },
} as const

function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>
}

function MultilineText({ value }: { value: string }) {
  const lines = value.split('\n')
  return <>{lines.map((line, index) => <span key={`${line}-${index}`}>{line}{index < lines.length - 1 && <br />}</span>)}</>
}

function App() {
  const [locale, setLocale] = useState<Locale>('en')
  const [creditsOpen, setCreditsOpen] = useState(false)
  const text = copy[locale]
  const landing = landingCopy[locale]

  return (
    <div className="hub-shell">
      <header className="site-header">
        <a className="brand" href="#top">E2R Hub</a>
        <div className="locale-switch" aria-label="Language">
          <button className={locale === 'en' ? 'active' : ''} type="button" onClick={() => setLocale('en')}>English</button>
          <button className={locale === 'ja' ? 'active' : ''} type="button" onClick={() => setLocale('ja')}>日本語</button>
        </div>
      </header>

      <main id="top">
        <section className="hero-section">
          <p className="eyebrow">{text.ecosystem}</p>
          <h1><MultilineText value={text.hero} /></h1>
          <p>{text.heroIntro}</p>
        </section>

        <section className="section choice-section" aria-labelledby="choose-heading">
          <h2 id="choose-heading">{text.choose}</h2>
          <div className="application-grid">
            <ExternalLink className="application-card" href={links.narrativeLine}>
              <h3>{text.narrativeAction}</h3>
              <p className="product-name">{text.narrativeTitle}</p>
              <p>{landing.narrativeDescription}</p>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </ExternalLink>
            <ExternalLink className="application-card" href={links.liaisonScape}>
              <h3>{text.liaisonAction}</h3>
              <p className="product-name">{text.liaisonTitle}</p>
              <p>{text.liaisonDescription}</p>
              <small>{text.mobileNote}</small>
              <span className="card-arrow" aria-hidden="true">↗</span>
            </ExternalLink>
          </div>
        </section>

        <section className="section sample-section" aria-labelledby="sample-heading">
          <div className="section-heading">
            <span className="eyebrow">{text.tryIt}</span>
            <h2 id="sample-heading">{text.otherSamples}</h2>
            <p>{landing.sampleIntro}</p>
          </div>
          <div className="sample-grid">
            <article className="sample-card">
              <h3>{text.berlinTitle}</h3>
              <p>{text.berlinDescription}</p>
              <div className="sample-card-actions">
                <ExternalLink href={links.narrativeLine}>{text.openNarrative}</ExternalLink>
                <ExternalLink href={links.liaisonScape}>{text.openLiaison}</ExternalLink>
                <ExternalLink href={links.berlinWall}>{text.viewDataset}</ExternalLink>
              </div>
            </article>
            <article className="sample-card">
              <h3>{text.apollo}</h3>
              <p>{text.apolloDescription}</p>
              <div className="sample-card-actions"><ExternalLink href={links.apollo}>{text.viewDataset}</ExternalLink></div>
            </article>
            <article className="sample-card">
              <h3>{text.lighthouse}</h3>
              <p>{text.lighthouseDescription}</p>
              <div className="sample-card-actions"><ExternalLink href={links.lighthouse}>{text.viewDataset}</ExternalLink></div>
            </article>
            <article className="sample-card">
              <h3>{text.ashenCrownTitle}</h3>
              <p>{text.ashenCrownDescription}</p>
              <div className="sample-card-actions"><ExternalLink href={links.ashenCrown}>{text.viewDataset}</ExternalLink></div>
            </article>
            <article className="sample-card">
              <h3>{text.titanicTitle}</h3>
              <p>{text.titanicDescription}</p>
              <div className="sample-card-actions"><ExternalLink href={links.titanic}>{text.viewDataset}</ExternalLink></div>
            </article>
          </div>
        </section>

        <section className="section explanation-section" aria-labelledby="what-heading">
          <span className="eyebrow">{text.whatIs}</span>
          <h2 id="what-heading"><MultilineText value={text.whatIsLead} /></h2>
          <div className="explanation-copy">
            <p>{text.whatIsIntro}</p>
            <ol>
              <li>{text.whatIsPoint1}</li>
              <li>{text.whatIsPoint2}</li>
              <li>{text.whatIsPoint3}</li>
              <li>{text.whatIsPoint4}</li>
            </ol>
            <ExternalLink className="action-link" href={links.specification}>{text.learnSpec} ↗</ExternalLink>
          </div>
        </section>

        <section className="section tools-section" aria-labelledby="tools-heading">
          <span className="eyebrow">{text.tools}</span>
          <h2 id="tools-heading">{text.validator}</h2>
          <p>{text.validatorDescription}</p>
          <ExternalLink href={links.validator}>{text.validator} ↗</ExternalLink>
        </section>
        <section className="section documentation-section" aria-labelledby="documentation-heading">
          <span className="eyebrow">{landing.documentation}</span>
          <h2 id="documentation-heading">{landing.documentation}</h2>
          <p>{landing.documentationIntro}</p>
          <div className="documentation-grid">
            <article className="documentation-card">
              <h3>{text.narrativeTitle}</h3>
              <p>{landing.narrativeDescription}</p>
              <div className="documentation-actions">
                <ExternalLink href={links.narrativeGuideEn}>{landing.guide} (EN)</ExternalLink>
                <ExternalLink href={links.narrativeGuideJa}>{landing.guide} (JA)</ExternalLink>
              </div>
            </article>
            <article className="documentation-card">
              <h3>{text.liaisonTitle}</h3>
              <p>{text.liaisonDescription}</p>
              <div className="documentation-actions">
                <ExternalLink href={links.liaisonGuideEn}>{landing.guide} (EN)</ExternalLink>
                <ExternalLink href={links.liaisonGuideJa}>{landing.guide} (JA)</ExternalLink>
              </div>
            </article>
            <article className="documentation-card">
              <h3>{text.specificationRepo}</h3>
              <p>{landing.documentationIntro}</p>
              <div className="documentation-actions">
                <ExternalLink href={links.specificationDocs}>{landing.specificationDocs}</ExternalLink>
                <ExternalLink href={links.specification}>{text.specificationRepo}</ExternalLink>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span><strong>E2R Hub</strong><br />{text.ecosystem}</span>
        <div>
          <button type="button" onClick={() => setCreditsOpen(true)}>{text.credits}</button>
        </div>
      </footer>

      {creditsOpen && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.currentTarget === event.target) setCreditsOpen(false) }}>
          <section className="credits-modal" role="dialog" aria-modal="true" aria-labelledby="credits-heading">
            <div className="modal-header">
              <h2 id="credits-heading">{text.credits}</h2>
              <button type="button" aria-label={text.close} onClick={() => setCreditsOpen(false)}>×</button>
            </div>
            <p>E2R Hub</p>
            <p>{text.createdBy}<br />{text.createdDate}</p>
            <p>{text.gratitude}</p>
            <ExternalLink href={links.specification}>{text.specificationRepo}</ExternalLink>
            <button className="modal-close" type="button" onClick={() => setCreditsOpen(false)}>{text.close}</button>
          </section>
        </div>
      )}
    </div>
  )
}

export default App
