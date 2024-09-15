import store from '@/store'
export class CallManager {

    activeSession = null
    notConfirmedSessions = new Map()
    deferredSessions = new Map()
    sessionShown = null

    addSession(session) {
        this.subscribeOnSessionEvents(session)
        this.notConfirmedSessions.set(session, session)
        this.notConfirmedSessions = new Map(this.notConfirmedSessions)
        this.sessionShown = session
        return this
    }

    transferSession(session) {
        if (this.notConfirmedSessions.has(session)) {
            this.notConfirmedSessions.delete(session)
            this.notConfirmedSessions = new Map(this.notConfirmedSessions)
        }
        session && session.hold()
        this.deferredSessions.set(session, session)
        this.deferredSessions = new Map(this.deferredSessions)
        if (session === this.activeSession) this.activeSession = null
        return this
    }

    removeSession(session) {
        session === this.activeSession && this.setActiveSession(null)
        if (this.deferredSessions.has(session)) {
            this.deferredSessions.delete(session)
            this.deferredSessions = new Map(this.deferredSessions)
        }
        if (this.notConfirmedSessions.has(session)) {
            this.notConfirmedSessions.delete(session)
            this.notConfirmedSessions = new Map(this.notConfirmedSessions)
        }
        if (!this.activeSession && this.deferredSessions.size > 0) {
            this.setActiveSession(this.getKeysDeferredSessions()[0])
        }
        if (session === this.sessionShown) {
            this.selectSessionByPriority()
        }
        return this
    }

    terminateAllSessions() {
        this.terminateNotConfirmedAndDeferredSessions('notConfirmedSessions')
        this.terminateNotConfirmedAndDeferredSessions('deferredSessions')
        this.activeSession ? store.dispatch('terminateSession', {
            terminateObj: {
              reason_phrase: this.activeSession.causes.BUSY, status_code: 486
            },
            session: this.activeSession}) : null
    }

    terminateNotConfirmedAndDeferredSessions(map) {
        this[map].forEach((value, key, map) => {
            store.dispatch('terminateSession', {
                terminateObj: {
                  reason_phrase: value.causes.BUSY, status_code: 486
                },
                session: value})
        })
    }

    selectSessionByPriority() {
        this.sessionShown = null
        const sessions = [...this.deferredSessions.keys(), this.activeSession, ...this.notConfirmedSessions.keys()].filter(el => !!el)
        this.sessionShown = sessions.pop() || null
    }

    setActiveSession(session) {
        this.activeSession && this.transferSession(this.activeSession)
        if (this.deferredSessions.has(session)) {
            this.deferredSessions.delete(session)
            this.deferredSessions = new Map(this.deferredSessions)
        }
        if (this.notConfirmedSessions.has(session)) {
            this.notConfirmedSessions.delete(session)
            this.notConfirmedSessions = new Map(this.notConfirmedSessions)
        }
        session && session.isOnHold().local && session.unhold()
        this.activeSession = session

        return this
    }

    getKeysDeferredSessions() {
        return [...this.deferredSessions.keys()]
    }
    getAllSessions() {
        return [...this.deferredSessions.keys(), ...this.notConfirmedSessions.keys(), this.activeSession].filter(el => !!el)
    }

    subscribeOnSessionEvents(session) {
        session.on('confirmed', () => {
            this.setActiveSession(session)
        })
        session.on('ended', () => {
            this.setRecentCalls({
                session, 
                failed: false,
                startTime: new Date(session.start_time).getTime(),
                endTime: new Date(session.end_time).getTime()
            })
            this.removeSession(session)
        })
        session.on('failed', () => {
            this.setRecentCalls({
                session, 
                failed: true,
                startTime: session.start_time ? new Date(session.start_time).getTime() : Date.now(),
                endTime: Date.now()
            })
            this.removeSession(session)
        })
    }

    setSessionShown(session) {
        this.sessionShown = session
    }

    setRecentCalls(payload) {
        let recentCallsStorage = localStorage.getItem('recentCalls') ? JSON.parse(localStorage.getItem('recentCalls')) : null
        const obj = {
            direction: payload.session?.direction,
            userName: payload.session?.remote_identity?.display_name,
            userNumber: payload.session?.remote_identity?.uri.user,
            startTime: payload.startTime,
            endTime: payload.endTime,
            failed: payload.failed
        }
        !recentCallsStorage ? recentCallsStorage = {} : null
        let recentCallsArray = []
        if (recentCallsStorage[store.getters.userInfo.uid]) {
            recentCallsArray = recentCallsStorage[store.getters.userInfo.uid]
        }
        recentCallsArray.unshift(obj)
        if (recentCallsArray.length > 30) {
            recentCallsArray.length = 30
        }
        recentCallsStorage[store.getters.userInfo.uid] = recentCallsArray
        localStorage.setItem('recentCalls', JSON.stringify(recentCallsStorage))
    }
}
