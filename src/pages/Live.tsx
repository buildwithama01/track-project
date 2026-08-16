import cctvFootage from "../assets/cctv-footage.mp4";

export default function Live() {
  return (
    <div className="page-content">
      <section className="page-hero page-hero--compact">
        <div>
          <p className="eyebrow">Live</p>
          <h1>Project live monitoring</h1>
        </div>
        {/* <div className="page-hero__actions">
          <button className="button button--outline" type="button">
            Share stream
          </button>
          <button className="button button--primary" type="button">
            Open full view
          </button>
        </div> */}
      </section>

      <div className="live-page">
        <div className="live-page__video">
          <div className="live-page__video-frame">
            <video
              src={cctvFootage}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
            />
          </div>
        </div>

        <aside className="live-page__sidebar">
          <div className="dashboard-card live-page__meta">
            <div>
              <p className="eyebrow">Status</p>
              <span className="live-status">
                <span className="live-status__dot" />
                Live now
              </span>
            </div>

            <div className="live-meta-item">
              <span>Site</span>
              <strong>Rivers State</strong>
            </div>

            <div className="live-meta-item">
              <span>Team</span>
              <strong>12 on site</strong>
            </div>

            <div className="live-meta-item">
              <span>Updated</span>
              <strong>2 min ago</strong>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="dashboard-card__header">
              <p className="eyebrow">Focus</p>
              <h2>Current monitoring</h2>
            </div>
            <ul className="attention-list">
              <li>
                <span>Safety checks</span>
                <strong>98%</strong>
              </li>
              <li>
                <span>Progress</span>
                <strong>76%</strong>
              </li>
              <li>
                <span>Materials</span>
                <strong>On track</strong>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
