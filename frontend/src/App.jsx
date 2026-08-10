import { useState } from 'react'
import jsPDF from 'jspdf'
import './App.css'

function App() {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  async function generateRequirements() {
    if (!idea.trim()) {
      alert('Please describe your app idea first.')
      return
    }

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch('http://127.0.0.1:8000/generate-requirements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: idea })
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error(error)
      alert('Something went wrong. Check the console.')
    } finally {
      setLoading(false)
    }
  }

  function exportToPDF() {
    if (!result) return

    const doc = new jsPDF()
    let y = 15

    function addSection(title, items) {
      doc.setFont(undefined, 'bold')
      doc.setFontSize(14)
      doc.text(title, 15, y)
      y += 8
      doc.setFont(undefined, 'normal')
      doc.setFontSize(11)

      items.forEach((item) => {
        const lines = doc.splitTextToSize(`• ${item}`, 180)
        lines.forEach((line) => {
          if (y > 280) { doc.addPage(); y = 15 }
          doc.text(line, 15, y)
          y += 7
        })
      })
      y += 5
    }

    doc.setFontSize(18)
    doc.setFont(undefined, 'bold')
    doc.text('AI Requirements Document', 15, y)
    y += 12

    doc.setFontSize(11)
    doc.setFont(undefined, 'normal')
    const scopeLines = doc.splitTextToSize(`Project Scope: ${result.project_scope}`, 180)
    scopeLines.forEach((line) => { doc.text(line, 15, y); y += 7 })
    y += 5

    addSection('Functional Requirements', result.functional_requirements)
    addSection('Non-Functional Requirements', result.non_functional_requirements)
    addSection('User Stories', result.user_stories)
    addSection('Risks', result.risks.map(r => `${r.risk} — Mitigation: ${r.mitigation}`))
    addSection('Acceptance Criteria', result.acceptance_criteria)
    addSection('Assumptions', result.assumptions)

    doc.save('requirements.pdf')
  }

return (
  <>
    <header className="navbar">
      <div className="logo">⚡ ReqEngineer</div>
      <span className="navbar-tag">AI-Powered Requirements Analyst</span>
    </header>

    <div className="blob blob1"></div>
    <div className="blob blob2"></div>
    <div className="blob blob3"></div>

    <div className="container">
      <div className="hero">
        <h1>Turn any app idea into a full requirements document</h1>
        <p className="subtitle">Describe your idea and get functional requirements, user stories, risks, and acceptance criteria — instantly.</p>
      </div>

      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Describe your app idea..."
      />
      <br />
      <button onClick={generateRequirements}>Generate</button>
      {result && <button onClick={exportToPDF}>Export as PDF</button>}

      {loading && (
        <div className="loading-wrap">
          <div className="spinner"></div>
          <span>Generating requirements...</span>
        </div>
      )}

      {result && (
        <div className="result">
          <section style={{ animationDelay: '0s' }}>
            <h2>Project Scope</h2>
            <p>{result.project_scope}</p>
          </section>

          <section style={{ animationDelay: '0.05s' }}>
            <h2>Functional Requirements</h2>
            <ul>
              {result.functional_requirements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section style={{ animationDelay: '0.1s' }}>
            <h2>Non-Functional Requirements</h2>
            <ul>
              {result.non_functional_requirements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section style={{ animationDelay: '0.15s' }}>
            <h2>User Stories</h2>
            <ul>
              {result.user_stories.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section style={{ animationDelay: '0.2s' }}>
            <h2>Risks</h2>
            {result.risks.map((item, i) => (
              <div className="risk-item" key={i}>
                <div className="risk-title">⚠️ {item.risk}</div>
                <div className="mitigation">Mitigation: {item.mitigation}</div>
              </div>
            ))}
          </section>

          <section style={{ animationDelay: '0.25s' }}>
            <h2>Acceptance Criteria</h2>
            <ul>
              {result.acceptance_criteria.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section style={{ animationDelay: '0.3s' }}>
            <h2>Assumptions</h2>
            <ul>
              {result.assumptions.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </div>
  </>
)
}

export default App
