import { CallManager } from './callManager'

export const Session = {
    state: {
        callManager: new CallManager(),
        remoteStream: null
    },
    actions: {
        answerCall(ctx, payload) {
            payload.session.answer({audio: true})
        },
        terminateSession(ctx, payload) {
            payload.session.terminate(payload.terminateObj)
        },
        holdSession({state}, {session}) {
            state.callManager.transferSession(session)
        },
        unHoldSession({state}, {session}) {
            state.callManager.setActiveSession(session)
        },
        muteSession(ctx, payload) {
            payload.session.mute()
        },
        unmuteSession(ctx, payload) {
            payload.session.unmute()
        },
        terminateAllSessions({state}) {
            state.callManager.terminateAllSessions()
        }
    },
    mutations: {
        addSession(state, payload) {
            state.callManager.addSession(payload)
        },
        changeSession(state, payload) {
            state.callManager.transferSession(payload)
            state.callManager.setActiveSession(payload)
        },
        setSessionShown(state, payload) {
            state.callManager.setSessionShown(payload)
        }
    },
    getters: {
        callManager: state => state.callManager,
        activeSession: state => state.callManager.activeSession,
        deferredSessions: state => [...state.callManager.deferredSessions.values()],
        notConfirmedSessions: state => [...state.callManager.notConfirmedSessions.values()],
        getSetSessionShown: state => state.callManager.sessionShown,
        getAllSession: state => state.callManager.getAllSessions()
    }
}
