const AgentMapWs = () => new WebSocket(`${window.env.WS_URL}/agent-map`, localStorage.getItem('token'))

export default AgentMapWs
