function Tabs({ activeTab, setActiveTab }) {
  // Tabs changing
  function handleTab(e) {
    const tabName = e.target.textContent;
    setActiveTab(tabName.toLowerCase());
  }
  return (
    <div className="explore__filters">
      <button
        onClick={(e) => handleTab(e)}
        className={`filter-btn ${activeTab === "all" ? "active" : ""}`}
      >
        All
      </button>
      <button
        onClick={(e) => handleTab(e)}
        className={`filter-btn ${activeTab === "empires" ? "active" : ""}`}
      >
        Empires
      </button>
      <button
        onClick={(e) => handleTab(e)}
        className={`filter-btn ${activeTab === "figures" ? "active" : ""}`}
      >
        Figures
      </button>
      <button
        onClick={(e) => handleTab(e)}
        className={`filter-btn ${activeTab === "artifacts" ? "active" : ""}`}
      >
        Artifacts
      </button>
      <button
        onClick={(e) => handleTab(e)}
        className={`filter-btn ${activeTab === "timelines" ? "active" : ""}`}
      >
        Timelines
      </button>
      <button
        onClick={(e) => handleTab(e)}
        className={`filter-btn ${activeTab === "collections" ? "active" : ""}`}
      >
        Collections
      </button>
    </div>
  );
}

export default Tabs;
