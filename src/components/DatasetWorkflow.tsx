import { useId } from 'react'
import './DatasetWorkflow.css'

const copy = {
  en: {
    titleLead: 'Let one Dataset grow',
    titleEnd: 'across applications.',
    dataset: 'One E2R Dataset',
    datasetDetail: 'Your entities, events, and relationships',
    narrative: 'Timeline & Events',
    liaison: 'Relationships',
    parameter: 'Dimensions & Comparison',
    future: 'More E2R apps',
    futureDetail: 'New possibilities',
    transfer: 'Export and import the same Dataset to explore and edit it in another app.',
    sync: 'You transfer the Dataset yourself. It does not sync automatically.',
    invitation: 'You can build an E2R-compatible app, too.',
  },
  ja: {
    titleLead: 'ひとつのDatasetを、',
    titleEnd: 'アプリを越えて育てよう。',
    dataset: 'ひとつのE2R Dataset',
    datasetDetail: '存在・できごと・関係をひとまとめに',
    narrative: '年表・出来事',
    liaison: '相関図・関係',
    parameter: '評価軸・比較',
    future: '広がる可能性',
    futureDetail: 'これからのE2R対応アプリ',
    transfer: '同じDatasetを、書き出し・読み込みで別のアプリへ。視点を変えて閲覧・編集できます。',
    sync: '引き継ぎはユーザー自身が行います。自動同期ではありません。',
    invitation: 'あなたもE2R対応アプリを開発できます。',
  },
} as const

// Informational only: app launch and Dataset Handoff actions stay in their existing surfaces.
export function DatasetWorkflow({ locale }: { locale: 'en' | 'ja' }) {
  const text = copy[locale]
  const id = useId()
  const markerId = `${id}-arrow`
  const applications = [
    { key: 'narrative', name: 'NarrativeLine', detail: text.narrative },
    { key: 'liaison', name: 'LiaisonScape', detail: text.liaison },
    { key: 'parameter', name: 'ParameterPlotter', detail: text.parameter },
    { key: 'future', name: text.future, detail: text.futureDetail },
  ]

  return (
    <section className="section workflow-section" aria-labelledby={`${id}-heading`}>
      <h2 id={`${id}-heading`}><span>{text.titleLead}</span>{locale === 'en' ? ' ' : ''}<span>{text.titleEnd}</span></h2>
      <figure className="workflow-figure">
        <div className="workflow-diagram">
          <div className="workflow-dataset">
            <svg className="workflow-dataset-icon" viewBox="0 0 48 48" fill="none" aria-hidden="true">
              <rect x="6" y="6" width="36" height="36" rx="7" />
              <circle cx="15" cy="16" r="1.5" /><circle cx="15" cy="24" r="1.5" /><circle cx="15" cy="32" r="1.5" />
              <path d="M22 16h11M22 24h11M22 32h11" />
            </svg>
            <strong>{text.dataset}</strong>
            <span>{text.datasetDetail}</span>
          </div>
          {applications.map(app => (
            <div className={`workflow-app workflow-${app.key}`} key={app.key}>
              <strong>{app.name}</strong>
              <span>{app.detail}</span>
            </div>
          ))}
          {applications.map(app => (
            <svg className={`workflow-arrow workflow-arrow-${app.key}`} viewBox="0 0 48 48" aria-hidden="true" key={app.key}>
              <path d="M7 24h34M13 18l-6 6 6 6M35 18l6 6-6 6" />
            </svg>
          ))}
          <svg className="workflow-mobile-arrows" viewBox="0 0 100 400" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id={markerId} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="m2 2 3 3-3 3" />
              </marker>
            </defs>
            <path d="M40 50V350" />
            <path d="M8 200H40" markerStart={`url(#${markerId})`} />
            {[50, 150, 250, 350].map(y => (
              <path key={y} d={`M40 ${y}H92`} markerEnd={`url(#${markerId})`} />
            ))}
          </svg>
        </div>
        <figcaption>
          <p className="workflow-transfer">{text.transfer}</p>
          <p className="workflow-sync">{text.sync}</p>
        </figcaption>
      </figure>
      <p className="workflow-invitation">{text.invitation}</p>
    </section>
  )
}
