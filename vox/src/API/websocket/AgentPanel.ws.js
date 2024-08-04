const AgentPanelWs = () => new WebSocket(`${window.env.WS_URL}/agent-panel`, localStorage.getItem('token'))

export default AgentPanelWs
