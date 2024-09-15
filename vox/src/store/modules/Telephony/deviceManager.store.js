const DeviceManager = async () => {
    const devices = await window.navigator.mediaDevices.enumerateDevices()
    const getMicrophones = () => devices.filter(device => device.kind === 'audioinput')
    const getSpeakers = () => devices.filter(device => device.kind === 'audiooutput')
    const getCameras = () => devices.filter(device => device.kind === 'videoinput')
    const getCurrentSpeaker = () => devices.find(device => (device.deviceId === 'default' || device.groupId === 'default') && device.kind === 'audiooutput')
    const getCurrentMicrophone = () => devices.find(device => (device.deviceId === 'default' || device.groupId === 'default') && device.kind === 'audioinput')
    const selectAudioDevice = (id) => window.navigator.mediaDevices.getUserMedia({ audio: { deviceId: id } })
    const askDevicePermission = (permissionConstraints) => window.navigator.mediaDevices.getUserMedia(permissionConstraints)
    return {
        devices,
        getMicrophones,
        getSpeakers,
        getCameras,
        askDevicePermission,
        selectAudioDevice,
        getCurrentSpeaker,
        getCurrentMicrophone
    }
}


export const deviceManager = {
    state: {
        deviceManager: null,
        microphones: null,
        speakers: null,
        currentMicrophone: null,
        currentSpeaker: null,
        microphonesVolume: 1,
        microphoneGain: false,
        speakerVolume: 1,
        speakerGain: false
    },
    actions: {
        async createDeviceManager({commit}) {
            const deviceManager = await DeviceManager()
            commit('initializeDevices', {deviceManager})
        },
        async getMicrophones({state, commit}) {
            const microphones = await state.deviceManager.getMicrophones()
            const currentMicrophone = state.deviceManager.getCurrentMicrophone()
            commit('recMicrophones', microphones)
            commit('currentMicrophoneMutation', currentMicrophone)
        },
        async getSpeakers({state, commit}) {
            const speakers = await state.deviceManager.getSpeakers()
            const currentSpeaker = state.deviceManager.getCurrentSpeaker()
            commit('recSpeakers', speakers)
            commit('currentSpeakerMutation', currentSpeaker)
        },
        async setCurrentMicrophone({state, commit}, payload) {
            const stream = await state.deviceManager.selectAudioDevice(payload.deviceId)
            commit('setStream', stream)
            commit('currentMicrophoneMutation', payload)
        },
        async setCurrentSpeaker({state, commit}, payload) {
            const stream = await state.deviceManager.selectAudioDevice(payload.deviceId)
            commit('currentSpeakerMutation', payload)
        },
        async setAudioVolume({commit}, payload) {

            const streamType = {
                setStream: 'setStream'
            }
            
            const volume = +payload.volume
            const stream = payload.stream
            payload.streamCommit ? commit(streamType[payload.streamCommit], stream) : null
            payload.volumeCommit ? commit(payload.volumeCommit, volume) : null  
        }

    },
    mutations: {
        initializeDevices(state, {deviceManager}) {
            state.deviceManager = deviceManager
        },
        recMicrophones(state, payload) {
            state.microphones = payload
        },
        recSpeakers(state, payload) {
            state.speakers = payload
        },
        currentMicrophoneMutation(state, payload) {
            state.currentMicrophone = payload
        },
        currentSpeakerMutation(state, payload) {
            state.currentSpeaker = payload
        },
        microphonesVolumeMutation(state, payload) {
            state.microphonesVolume = payload
        },
        microphoneGainMutation(state, payload) {
            state.microphoneGain = payload
        },
        speakerVolumeMutation(state, payload) {
            state.speakerVolume = payload
        },
        speakerGainMutation(state, payload) {
            state.speakerGain = payload
        }

    },
    getters: {
        deviceManager: state => state.deviceManager,
        microphones: state => state.microphones,
        speakers: state => state.speakers,
        currentMicrophone: state => state.currentMicrophone,
        currentSpeaker: state => state.currentSpeaker,
        getMicrophonesVolume: state => state.microphonesVolume,
        getMicrophoneGain: state => state.microphoneGain,
        getSpeakerVolume: state => state.speakerVolume,
        getSpeakerGain: state => state.speakerGain
    }
}
