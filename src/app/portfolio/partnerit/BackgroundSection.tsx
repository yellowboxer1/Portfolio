import { decisions } from "./case-study";
import styles from "./page.module.css";

const searchBarriers = [
  ["공고 찾기 어려움", 64.7],
  ["자격요건 판단 어려움", 18.2],
  ["상세 기준 불명확", 9.6],
  ["기타", 7.5],
] as const;

export default function BackgroundSection() {
  return (
    <section id="background" className={styles.section} aria-labelledby="background-title">
      <div className={styles.inner}>
        <header className={styles.splitHeading}>
          <div><p className={styles.kicker}>Background</p><h2 id="background-title">많은 공고보다,<br /> 우리 기업에 <em>맞는 기회</em></h2></div>
          <div className={styles.bodyCopy}>
            <p>지원사업은 많지만, 기업이 참여할 수 있는 사업을 찾는 일은 쉽지 않았습니다. 여러 기관에 흩어진 공고를 모으고 첨부파일을 읽은 뒤, 업력·지역·기술 분야처럼 서로 다른 조건을 하나씩 확인해야 했습니다. 공고를 찾는 데만 평균 5일 이상이 걸렸고, 이를 검토할 시간과 인력도 부족했습니다.</p>
            <p>맞는 공고를 찾은 뒤에도 문제가 남았습니다. 컨소시엄이 필요한 사업에서는 함께 수행할 기업을 구해야 했지만, 파트너 탐색은 기존 인맥에 의존하는 경우가 많았습니다. <strong>기술력이 있어도 사업에 참여할 기회로 이어지지 않는 점</strong>에 주목했습니다.</p>
          </div>
        </header>
        <div className={styles.backgroundEvidence}>
          <article className={styles.evidencePanel}>
            <p className={styles.featureLabel}>01 / 공고 탐색의 장벽</p>
            <h3>우리 기업에 맞는 공고를<br /> 찾기 어렵다는 기업</h3>
            <p className={styles.evidenceNumber}>64.7<span>%</span></p>
            <ul className={styles.barrierBars} aria-label="기업의 공고 탐색 애로사항 비율">
              {searchBarriers.map(([label, value]) => <li key={label}><div><span>{label}</span><strong>{value}%</strong></div><span className={styles.barrierTrack} aria-hidden="true"><span style={{ width: `${value}%` }} /></span></li>)}
            </ul>
            <p className={styles.evidenceSource}>2023 중소벤처기업부 실태조사 · 서비스 소개서 수록 자료</p>
          </article>
          <article className={styles.evidencePanel}>
            <p className={styles.featureLabel}>02 / 사업 참여의 장벽</p>
            <h3>함께할 기업을 구해야 하는<br /> 정부 R&amp;D 과제</h3>
            <p className={styles.evidenceNumber}><small>약</small>43<span>%</span></p>
            <p className={styles.evidenceDescription}>컨소시엄 구성이 필요한 과제라도 새로운 파트너를 찾을 통로는 충분하지 않았습니다.</p>
            <ul className={styles.partnerBarriers}>
              <li><strong>기존 네트워크 중심의 구성</strong><span>새로운 기업이 참여하기 어려운 구조</span></li>
              <li><strong>인맥에 의존하는 파트너 탐색</strong><span>기술력이 있어도 협력기업을 찾기 어려움</span></li>
              <li><strong>기업 간 역량을 비교할 기준 부족</strong><span>사업에 필요한 역할과 기술의 연결이 어려움</span></li>
            </ul>
            <p className={styles.evidenceSource}>서비스 소개서 Background · 컨소시엄 참여 구조 분석</p>
          </article>
        </div>
        <div className={styles.backgroundDirection}>
          <p className={styles.kicker}>Planning Intent · 기획 의도</p>
          <h3>공고를 찾은 뒤, 실제 지원까지 이어지게</h3>
          <p>기업에 필요한 것은 공고 목록을 더 받는 일보다, 우리 기업이 어디에 지원할 수 있고 무엇을 준비해야 하는지 아는 것이라고 보았습니다. 공고 탐색을 줄여도 자격을 다시 확인하고 협력기업을 따로 구해야 한다면, 사업에 참여하기까지의 어려움은 남기 때문입니다.</p>
          <p>그래서 기업 프로필을 기준으로 지원 자격을 확인하고, 리포트에서 부족한 역량과 준비할 내용을 짚은 뒤, 필요한 파트너와 함께 지원을 준비하는 흐름을 잡았습니다. 공고 추천과 진단, 컨소시엄, 협업을 이 과정 안에서 연결했습니다.</p>
        </div>
        <div className={styles.decisionList}>
          {decisions.map(item => <article key={item.title}><p className={styles.problem}>{item.problem}</p><div><h3>{item.title}</h3><p>{item.body}</p></div></article>)}
        </div>
      </div>
    </section>
  );
}
