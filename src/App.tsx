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
  sampleProvenance: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/docs/public-sample-provenance.md',
  validator: 'https://github.com/sukoyaka-dopeness/e2r-validator',
  berlinWallDataset: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-narrative-line/main/src/sample/berlin-wall-history.en.e2r.json',
  berlinWallDatasetJa: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-narrative-line/main/src/sample/berlin-wall-history.ja.e2r.json',
  lighthouseDataset: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-liaison-scape/main/public/lighthouse-restoration-demo.en.e2r.json',
  lighthouseDatasetJa: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-liaison-scape/main/public/lighthouse-restoration-demo.ja.e2r.json',
  apolloDataset: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-spec/main/examples/apollo-11-mission.en.e2r.json',
  apolloDatasetJa: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-spec/main/examples/apollo-11-mission.ja.e2r.json',
  ashenCrownDataset: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-spec/main/examples/ashen-crown.en.e2r.json',
  ashenCrownDatasetJa: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-spec/main/examples/ashen-crown.ja.e2r.json',
  titanicDataset: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-spec/main/examples/titanic-final-voyage.en.e2r.json',
  titanicDatasetJa: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-spec/main/examples/titanic-final-voyage.ja.e2r.json',
  berlinWall: 'https://github.com/sukoyaka-dopeness/e2r-narrative-line/blob/main/src/sample/berlin-wall-history.en.e2r.json',
  berlinWallJa: 'https://github.com/sukoyaka-dopeness/e2r-narrative-line/blob/main/src/sample/berlin-wall-history.ja.e2r.json',
  lighthouse: 'https://github.com/sukoyaka-dopeness/e2r-liaison-scape/blob/main/public/lighthouse-restoration-demo.en.e2r.json',
  lighthouseJa: 'https://github.com/sukoyaka-dopeness/e2r-liaison-scape/blob/main/public/lighthouse-restoration-demo.ja.e2r.json',
  apollo: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/examples/apollo-11-mission.en.e2r.json',
  apolloJa: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/examples/apollo-11-mission.ja.e2r.json',
  ashenCrown: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/examples/ashen-crown.en.e2r.json',
  ashenCrownJa: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/examples/ashen-crown.ja.e2r.json',
  titanic: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/examples/titanic-final-voyage.en.e2r.json',
  titanicJa: 'https://github.com/sukoyaka-dopeness/e2r-spec/blob/main/examples/titanic-final-voyage.ja.e2r.json',
  selfDescriptionDataset: 'https://raw.githubusercontent.com/sukoyaka-dopeness/e2r-spec/main/examples/e2r-self-description.json',
  githubSponsors: 'https://github.com/sponsors/sukoyaka-dopeness',
}

const copy = {
  en: {
    ecosystem: 'E2R application ecosystem',
    footerDescriptor: 'application ecosystem',
    hero: 'One dataset\ntwo views.',
    heroIntro: 'View and edit the same dataset as a timeline or a relationship diagram.',
    choose: 'Which would you like to use?',
    timeline: 'Timeline',
    relationshipDiagram: 'Relationship diagram',
    narrativeAction: 'View and edit a timeline',
    liaisonAction: 'View and edit a relationship diagram',
    narrativeTitle: 'NarrativeLine',
    narrativeDescription: 'View and edit events over time.',
    liaisonTitle: 'LiaisonScape',
    liaisonDescription: 'View and edit relationships between entities.',
    mobileNote: 'Editing is best on a desktop screen.',
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
    sampleInfo: 'Sources / License',
    selfDescriptionTitle: 'E2R Self-Description',
    selfDescriptionDescription: 'A dogfood Dataset that describes E2R itself. It is non-normative and separate from the five-sample Gallery.',
    selfDescriptionOpen: 'Open Self-Description',
    selfDescriptionInfo: 'Self-Description info',
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
    supportE2r: 'Support E2R on GitHub Sponsors',
  },
  ja: {
    ecosystem: 'E2R アプリケーションエコシステム',
    footerDescriptor: 'アプリケーションエコシステム',
    hero: 'ひとつのDatasetを\nふたつの視点で\n見てみよう。',
    heroIntro: '同じDatasetを年表と相関図で見たり編集したりできます。',
    choose: 'どちらを使いますか？',
    timeline: '年表',
    relationshipDiagram: '相関図',
    narrativeAction: '年表を見たり、作ったり',
    liaisonAction: '相関図を見たり、作ったり',
    narrativeTitle: 'NarrativeLine',
    narrativeDescription: 'イベントの時間の流れを見たり、編集したりできます。',
    liaisonTitle: 'LiaisonScape',
    liaisonDescription: 'エンティティ同士の関係を見たり、編集したりできます。',
    mobileNote: '編集にはPC画面が適しています。',
    tryIt: '実際の例を見る',
    berlinTitle: 'ベルリンの壁の歴史',
    berlinDescription: '歴史上のイベントを、時間と関係の両方から見られるサンプルです。',
    apolloDescription: '複数のE2Rアプリで閲覧、編集できる代表的なサンプルです。',
    lighthouseDescription: '架空の古い灯台を修復する人々を描いたサンプルです。',
    ashenCrownDescription: '架空の王国を舞台に、10人の人物とその歴史、同盟、対立、秘密を描く創作サンプルです。',
    ashenCrownTitle: '灰冠の王国',
    titanicTitle: 'タイタニック号 最後の航海',
    titanicDescription: 'タイタニック号の最後の航海を、人々、船、関係、出来事からたどる歴史サンプルです。',
    openNarrative: 'NarrativeLineで開く',
    openLiaison: 'LiaisonScapeで開く',
    viewDataset: 'Dataset JSONを見る',
    sampleInfo: '出典・ライセンス',
    selfDescriptionTitle: 'E2R Self-Description',
    selfDescriptionDescription: '通常のサンプルギャラリーとは別の、E2R自身を説明するdogfood Datasetです。非規範的な内容です。',
    selfDescriptionOpen: 'Self-Descriptionを開く',
    selfDescriptionInfo: 'Self-Descriptionの情報',
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
    supportE2r: 'GitHub SponsorsでE2Rを支援する',
  },
} as const

const landingCopy = {
  en: {
    guide: 'User Guide',
    narrativeDescription: 'View and edit events over time.',
    sampleIntro: 'Choose a sample Dataset and open it in NarrativeLine or LiaisonScape.',
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

function buildDatasetHandoffUrl(applicationUrl: string, datasetUrl: string) {
  return `${applicationUrl}#datasetUrl=${encodeURIComponent(datasetUrl)}`
}

function localizedSampleUrl(locale: Locale, englishUrl: string, japaneseUrl: string) {
  return locale === 'ja' ? japaneseUrl : englishUrl
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
            </ExternalLink>
            <ExternalLink className="application-card" href={links.liaisonScape}>
              <h3>{text.liaisonAction}</h3>
              <p className="product-name">{text.liaisonTitle}</p>
              <small>{text.mobileNote}</small>
            </ExternalLink>
          </div>
        </section>

        <section className="section sample-section" aria-labelledby="sample-heading">
          <div className="section-heading">
            <span className="eyebrow">{text.tryIt}</span>
            <h2 id="sample-heading">{text.otherSamples}</h2>
            <p>{locale === 'ja' ? 'サンプルデータセットを選んで、NarrativeLineまたはLiaisonScapeで開いてみましょう。' : landing.sampleIntro}</p>
          </div>
          <div className="sample-grid">
            <article className="sample-card">
              <h3>{text.berlinTitle}</h3>
              <p>{text.berlinDescription}</p>
              <small>{locale === 'ja' ? 'データセット: 日本語' : 'Dataset: English'}</small>
              <div className="sample-card-actions">
                <ExternalLink href={buildDatasetHandoffUrl(links.narrativeLine, localizedSampleUrl(locale, links.berlinWallDataset, links.berlinWallDatasetJa))}>{text.openNarrative}</ExternalLink>
                <ExternalLink href={buildDatasetHandoffUrl(links.liaisonScape, localizedSampleUrl(locale, links.berlinWallDataset, links.berlinWallDatasetJa))}>{text.openLiaison}</ExternalLink>
              </div>
              <ExternalLink className="sample-info-link" href={links.sampleProvenance}>{text.sampleInfo}</ExternalLink>
            </article>
            <article className="sample-card">
              <h3>{text.apollo}</h3>
              <p>{text.apolloDescription}</p>
              <small>{locale === 'ja' ? 'データセット: 日本語' : 'Dataset: English'}</small>
              <div className="sample-card-actions">
                <ExternalLink href={buildDatasetHandoffUrl(links.narrativeLine, localizedSampleUrl(locale, links.apolloDataset, links.apolloDatasetJa))}>{text.openNarrative}</ExternalLink>
                <ExternalLink href={buildDatasetHandoffUrl(links.liaisonScape, localizedSampleUrl(locale, links.apolloDataset, links.apolloDatasetJa))}>{text.openLiaison}</ExternalLink>
              </div>
              <ExternalLink className="sample-info-link" href={links.sampleProvenance}>{text.sampleInfo}</ExternalLink>
            </article>
            <article className="sample-card">
              <h3>{text.lighthouse}</h3>
              <p>{text.lighthouseDescription}</p>
              <small>{locale === 'ja' ? 'データセット: 日本語' : 'Dataset: English'}</small>
              <div className="sample-card-actions">
                <ExternalLink href={buildDatasetHandoffUrl(links.narrativeLine, localizedSampleUrl(locale, links.lighthouseDataset, links.lighthouseDatasetJa))}>{text.openNarrative}</ExternalLink>
                <ExternalLink href={buildDatasetHandoffUrl(links.liaisonScape, localizedSampleUrl(locale, links.lighthouseDataset, links.lighthouseDatasetJa))}>{text.openLiaison}</ExternalLink>
              </div>
              <ExternalLink className="sample-info-link" href={links.sampleProvenance}>{text.sampleInfo}</ExternalLink>
            </article>
            <article className="sample-card">
              <h3>{text.ashenCrownTitle}</h3>
              <p>{text.ashenCrownDescription}</p>
              <small>{locale === 'ja' ? 'データセット: 日本語' : 'Dataset: English'}</small>
              <div className="sample-card-actions">
                <ExternalLink href={buildDatasetHandoffUrl(links.narrativeLine, localizedSampleUrl(locale, links.ashenCrownDataset, links.ashenCrownDatasetJa))}>{text.openNarrative}</ExternalLink>
                <ExternalLink href={buildDatasetHandoffUrl(links.liaisonScape, localizedSampleUrl(locale, links.ashenCrownDataset, links.ashenCrownDatasetJa))}>{text.openLiaison}</ExternalLink>
              </div>
              <ExternalLink className="sample-info-link" href={links.sampleProvenance}>{text.sampleInfo}</ExternalLink>
            </article>
            <article className="sample-card">
              <h3>{text.titanicTitle}</h3>
              <p>{text.titanicDescription}</p>
              <small>{locale === 'ja' ? 'データセット: 日本語' : 'Dataset: English'}</small>
              <div className="sample-card-actions">
                <ExternalLink href={buildDatasetHandoffUrl(links.narrativeLine, localizedSampleUrl(locale, links.titanicDataset, links.titanicDatasetJa))}>{text.openNarrative}</ExternalLink>
                <ExternalLink href={buildDatasetHandoffUrl(links.liaisonScape, localizedSampleUrl(locale, links.titanicDataset, links.titanicDatasetJa))}>{text.openLiaison}</ExternalLink>
              </div>
              <ExternalLink className="sample-info-link" href={links.sampleProvenance}>{text.sampleInfo}</ExternalLink>
            </article>
          </div>
        </section>

        <section className="section self-description-section" aria-labelledby="self-description-heading">
          <span className="eyebrow">{text.selfDescriptionTitle}</span>
          <h2 id="self-description-heading">{text.selfDescriptionTitle}</h2>
          <p>{text.selfDescriptionDescription}</p>
          <div className="documentation-actions">
            <ExternalLink href={buildDatasetHandoffUrl(links.narrativeLine, links.selfDescriptionDataset)}>{text.selfDescriptionOpen} / {text.narrativeTitle}</ExternalLink>
            <ExternalLink href={buildDatasetHandoffUrl(links.liaisonScape, links.selfDescriptionDataset)}>{text.selfDescriptionOpen} / {text.liaisonTitle}</ExternalLink>
            <ExternalLink href={links.sampleProvenance}>{text.selfDescriptionInfo}</ExternalLink>
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
            <ExternalLink className="action-link" href={links.specification}>{text.learnSpec}</ExternalLink>
          </div>
        </section>

        <section className="section tools-section" aria-labelledby="tools-heading">
          <span className="eyebrow">{text.tools}</span>
          <h2 id="tools-heading">{text.validator}</h2>
          <p>{text.validatorDescription}</p>
          <ExternalLink href={links.validator}>{text.validator}</ExternalLink>
        </section>
        <section className="section documentation-section" aria-labelledby="documentation-heading">
          <span className="eyebrow">{locale === 'ja' ? 'さらに詳しく' : 'Learn more'}</span>
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
            <article className="documentation-card">
              <h3>{locale === 'ja' ? 'サンプルデータセットのソース' : 'Sample Dataset sources'}</h3>
              <p>{locale === 'ja' ? 'データセット: 日本語' : 'Dataset: English'}</p>
              <div className="documentation-actions">
                <ExternalLink href={links.sampleProvenance}>{text.sampleInfo}</ExternalLink>
                <ExternalLink href={localizedSampleUrl(locale, links.berlinWall, links.berlinWallJa)}>{text.berlinTitle}</ExternalLink>
                <ExternalLink href={localizedSampleUrl(locale, links.apollo, links.apolloJa)}>{text.apollo}</ExternalLink>
                <ExternalLink href={localizedSampleUrl(locale, links.lighthouse, links.lighthouseJa)}>{text.lighthouse}</ExternalLink>
                <ExternalLink href={localizedSampleUrl(locale, links.ashenCrown, links.ashenCrownJa)}>{text.ashenCrownTitle}</ExternalLink>
                <ExternalLink href={localizedSampleUrl(locale, links.titanic, links.titanicJa)}>{text.titanicTitle}</ExternalLink>
              </div>
            </article>
          </div>
        </section>
        <div className="site-support">
          <ExternalLink className="site-support-link" href={links.githubSponsors}>{text.supportE2r}</ExternalLink>
        </div>
      </main>

      <footer className="site-footer">
        <span>{text.footerDescriptor}</span>
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
