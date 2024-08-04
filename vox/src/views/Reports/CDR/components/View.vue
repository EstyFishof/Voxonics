<template>
  <div>
    <div class="wrap-table">
      <table>
        <thead>
        <tr class="header">
          <th class="left-item border-item">Date & Time</th>
          <th class="border-item">Agent Name</th>
          <th class="border-item">Agent Number</th>
          <th class="border-item">
            Redirect
            <img class="question-mark" src="@/assets/img/icons/question-mark-white.svg"/>
          </th>
          <th class="border-item">Сall Status</th>
          <th class="border-item">V-Number (DID)</th>
          <th class="border-item">Call Type</th>
          <th class="border-item">Phone Number</th>
          <th class="border-item">Duration</th>
          <th class="border-item">Bill Sec</th>
          <th class="border-item" v-show="userInfo.permission.cdr.billing">Cost</th>
          <th class="border-item"
              :class="{'right-item': !userInfo.permission.cdr.export && !userInfo.permission.cdr.listen}">Call.ID
          </th>
          <th class="border-item" :class="{'right-item': !userInfo.permission.cdr.export}"
              v-show="userInfo.permission.cdr.listen">Listen
          </th>
          <th class="right-item border-item" v-show="userInfo.permission.cdr.export">Export</th>
        </tr>
        </thead>
        <tbody ref="tbody">
        <tr v-for="(call, index) of getCDR" :key="index" :ref="call.id">
          <td class="left-item border-item">{{ call.calldate }}</td>
          <td class="border-item ellipsis name">{{ call.name }}</td>
          <td class="border-item">{{ call.internalNumber }}</td>
          <td class="border-item">{{ call.localDst }}</td>
          <td class="border-item">{{ call.disposition }}</td>
          <td class="border-item">
            <img class="flag" :src="call.vnumberCountry"/>
            {{ call.vnumber }}
            <div class="description">{{ call.vnumberDescription }}</div>
          </td>
          <td class="border-item"><img :src="callType[call.calltype]" :content="call.calltype"
                                       v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"/></td>
          <td class="border-item phone-cell">
            <div class="phone-wrapper">
              <span class="phone">{{ call.phone }}</span>
              <img class="flag" :src="call.phoneCountry"/>
            </div>
          </td>
          <td class="border-item">{{ call.duration }}</td>
          <td class="border-item">{{ call.billsec }}</td>
          <td class="border-item" v-show="userInfo.permission.cdr.billing">{{ call.cost }}</td>
          <td class="border-item"
              :class="{'right-item': !userInfo.permission.cdr.export && !userInfo.permission.cdr.listen}">
            <input :value="call.uniqueid" class="invisible" :ref="call.uniqueid.split('.').shift()" type="text">
            <CopyIcon
              @copyHandler="copy(call.uniqueid)"
            />
          </td>
          <td class="border-item" :class="{'right-item': !userInfo.permission.cdr.export}"
              v-show="userInfo.permission.cdr.listen">
            <div v-show="call.record">
              <audio :ref="call.uniqueid" :src="sound" @ended="played = ''"
                     @timeupdate="setTimeControl(call.uniqueid)"></audio>
              <img content="Play" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                   v-show="played !== call.uniqueid"
                   class="cursor" @click="play(call)"
                   :class="{disabled: call.disposition !== 'ANSWERED'}"
                   src="@/assets/img/icons/play.svg"/>
              <img content="Pause" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                   v-show="played === call.uniqueid"
                   class="cursor" @click="pause(call.uniqueid)"
                   src="@/assets/img/icons/pause.svg"/>
            </div>
          </td>
          <td class="right-item border-item" content="Download"
              v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
              v-show="userInfo.permission.cdr.export">
            <a v-show="call.record" :ref="call.id" @click="download(call)">
              <img class="cursor" :class="{disabled: call.disposition !== 'ANSWERED'}"
                   src="@/assets/img/icons/download.svg"/>
            </a>
          </td>
        </tr>
        <tr class="row-player" ref="player" v-show="played || paused">
          <td colspan="13">
              <span class="player">
                <span class="step-timer">
                  <img content="-10 sec" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                       class="cursor step" width="30"
                       @click="jumpTime('back')" src="@/assets/img/icons/back-step.svg"/>
                  <img content="Play"
                       v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                       v-show="paused" class="cursor"
                       width="18" @click="play(paused)"
                       src="@/assets/img/icons/play.svg"/>
                  <img content="Pause" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                       v-show="played" class="cursor"
                       width="15" @click="pause(played)"
                       src="@/assets/img/icons/pauseBig.svg"/>
                  <img content="+10 sec" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                       class="cursor step" width="30"
                       @click="jumpTime('fw')" src="@/assets/img/icons/forward-step.svg"/>
                </span>
                <span class="timer">
                  <span>{{ elapsed }}</span>
                  <!-- <span>{{theme}}</span> -->
                  <span class="range-wrapper timer-width" v-if="getRangeColor" :style="{background: `linear-gradient(to right, ${getRangeColor.start} 0%, ${getRangeColor.start} ${time}%,
                     ${getRangeColor.finish} ${time}%, ${getRangeColor.finish} 100%)`}"><input
                    v-model="time" @input="setTime(played || paused)" class="time" type="range" step="1" max="100"
                  /></span>
                  <span>{{ (finish / 60).toString().split('.').shift() + ':' + finished }}</span>
                </span>
                <span class="volume-wrapper">
                  <img class="hover" v-show="volume > 0" @click="clickMute(played || paused)"
                       src="@/assets/img/icons/quiet.svg" alt=""/>
                  <img class="mute hover" @click="clickUnMute(played || paused)" v-show="!Number(volume)"
                       src="@/assets/img/icons/mute.svg" alt=""/>
                  <span class="range-wrapper" :style="{background: `linear-gradient(to right, ${getRangeColor.start} 0%, ${getRangeColor.start} ${volume * 100}%,
                     ${getRangeColor.finish} ${volume * 100}%, ${getRangeColor.finish} 100%)`}"><input
                    v-model="volume" @input="setVolume(played || paused)" class="volume" type="range" step="0.01"
                    max="1"/></span>
                  <img class="hover" @click="upVolume(played || paused)" height="24"
                       src="@/assets/img/icons/volumeUp.svg" alt=""/>
                </span>
              </span>
          </td>
          <td>
             <span content="Close player" v-tippy="{ placement : 'top',  arrow: true, delay : 800, duration: 500 }"
                   @click="reset()" class="up">
               <svg width="15" height="15" viewBox="0 0 13 13" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M8.03177 6.50013L12.6823 1.84948C13.1059 1.42591 13.1059 0.741255 12.6823 0.317681C12.2588 -0.105894 11.5741 -0.105894 11.1506 0.317681L6.5 4.96833L1.84944 0.317681C1.42588 -0.105894 0.74124 -0.105894 0.317674 0.317681C-0.105891 0.741255 -0.105891 1.42591 0.317674 1.84948L4.96823 6.50013L0.317674 11.1508C-0.105891 11.5744 -0.105891 12.259 0.317674 12.6826C0.528915 12.8938 0.806237 13 1.08356 13C1.36088 13 1.6382 12.8938 1.84944 12.6826L6.5 8.03194L11.1506 12.6826C11.3618 12.8938 11.6391 13 11.9164 13C12.1938 13 12.4711 12.8938 12.6823 12.6826C13.1059 12.259 13.1059 11.5744 12.6823 11.1508L8.03177 6.50013Z"
                        fill="#515960"/>
               </svg>
             </span>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import inbound from '@/assets/img/icons/inbound.svg'
import outbound from '@/assets/img/icons/outbound.svg'
import local from '@/assets/img/icons/local.svg'
import emergency from '@/assets/img/icons/emergency.svg'
import service from '@/assets/img/icons/service-calls.svg'
import preferred from '@/assets/img/icons/preferred-type-icon.svg'
import { CDRGettersApi } from '@/API/getters'
import { handleError } from '@/API'
import CopyIcon from '../../../../components/CopyIcon.vue'

export default {
    name: "ViewCDR",
    data() {
        return {
            sound: null,
            downloadUrl: "",
            played: "",
            paused: "",
            time: 1,
            volume: 1,
            saveVolume: 0,
            callType: { 
              inbound: inbound, 
              outbound: outbound, 
              local: local, 
              emergency: emergency, 
              service: service,
              preferred: preferred,
            },
            start: 0,
            finish: 0,
            colorRange: {
                dark: { start: "#fff", finish: "#515960" },
                light: { start: "#515960", finish: "#E3E3EB" },
            }
        };
    },
    computed: {
        ...mapGetters(["getCDR", "userInfo", "theme"]),
        elapsed: function () {
            const sec = this.start % 60 < 10 ? "0" + (this.start % 60) : this.start % 60;
            const min = (this.start / 60).toString().split(".").shift() + ":";
            return min + sec;
        },
        finished: function () {
            if (this.finish % 60 < 10) {
                return "0" + this.finish % 60;
            }
            else {
                return this.finish % 60;
            }
        },
        getRangeColor() {
          if(this.theme === 'null') {
            return this.colorRange['dark']
          }
          return this.colorRange[this.theme]
        }
    },
    methods: {
        copy(id) {
            const ref = id.split(".").shift();
            this.$refs[ref][0].focus();
            this.$refs[ref][0].select();
            document.execCommand("copy");
        },
        upVolume(el) {
            if (this.volume < 1) {
                this.saveVolume = this.volume;
                this.volume = 1;
                this.setVolume(el);
            }
            else {
                this.volume = this.saveVolume;
                this.setVolume(el);
                this.saveVolume = 0;
            }
        },
        clickMute(el) {
            this.saveVolume = this.volume;
            this.volume = 0;
            this.setVolume(el);
        },
        clickUnMute(el) {
            this.volume = this.saveVolume;
            this.setVolume(el);
            this.saveVolume = 0;
        },
        async download(record) {
            CDRGettersApi.getMusic(record.id)
                .then(audio => {
                if (audio) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        this.downloadUrl = e.target.result;
                        const a = document.createElement("a");
                        document.body.appendChild(a);
                        a.target = "_blank";
                        a.style.display = "none";
                        a.href = this.downloadUrl;
                        a.download = `${record.calldate}/${record.uniqueid}.mp3`;
                        a.click();
                        a.remove();
                    };
                    reader.onerror = e => handleError(e);
                    if (audio instanceof ArrayBuffer) {
                        const blob = new Blob([audio]);
                        reader.readAsDataURL(blob);
                    }
                }
            });
        },
        createPlayer(el = null) {
            if (el) {
                this.$refs.tbody.insertBefore(this.$refs.player, this.$refs[el][1].nextSibling);
            }
        },
        setTimeControl(el) {
            const { round } = Math;
            const { duration } = this.$refs[el][0];
            this.finish = round(duration) || 0;
            this.time = round((this.$refs[el][0].currentTime / duration) * 100);
            this.start = round(this.$refs[el][0].currentTime);
        },
        setTime(el) {
            const { duration } = this.$refs[el][0];
            this.$refs[el][0].currentTime = Math.round((duration / 100) * this.time);
        },
        jumpTime(direction) {
            const ref = this.played || this.paused;
            const { duration, currentTime } = this.$refs[ref][0];
            if (direction === "back") {
                this.$refs[ref][0].currentTime =
                    currentTime - 10 > 0 ? currentTime - 10 : 0;
            }
            else {
                this.$refs[ref][0].currentTime =
                    currentTime + 10 < duration ? currentTime + 10 : duration;
            }
        },
        setVolume(el) {
            if (el) {
                this.$refs[el][0].volume = this.volume;
            }
        },
        async play(el) {
            if (typeof el === "object") {
                if (!this.played && el.uniqueid !== this.paused) {
                    await CDRGettersApi.getMusic(el.id)
                        .then(audio => {
                        const blob = new Blob([audio], { type: "audio/mp3" });
                        this.sound = URL.createObjectURL(blob);
                    });
                    await this.createPlayer(el.id);
                    this.played = el.uniqueid;
                    this.$refs[el.uniqueid][0].load();
                }
                else if (!this.played && el.uniqueid === this.paused) {
                    this.played = el.uniqueid;
                }
                else {
                    const music = this.played || this.paused;
                    this.$refs[music][0].pause();
                    await CDRGettersApi.getMusic(el.id)
                        .then(audio => {
                        const blob = new Blob([audio], { type: "audio/mp3" });
                        this.sound = URL.createObjectURL(blob);
                    });
                    await this.createPlayer(el.id);
                    this.played = el.uniqueid;
                    this.$refs[el.uniqueid][0].load();
                }
                this.$refs[el.uniqueid][0].play();
            }
            else {
                this.played = el;
                this.$refs[el][0].play();
            }
            this.paused = "";
        },
        pause(el) {
            this.paused = el;
            this.played = "";
            this.$refs[el][0].pause();
        },
        reset() {
            if (this.played) {
                this.$refs[this.played][0].pause();
            }
            else {
                this.$refs[this.paused][0].pause();
            }
            this.paused = this.played = "";
        }
    },
    mounted() {
        this.$store.subscribe(mutation => {
            if (mutation.type === "cdrMutation") {
                if (this.$refs[this.played] || this.$refs[this.paused]) {
                    this.reset();
                }
            }
        });
    },
    components: { CopyIcon }
}
</script>

<style scoped lang="scss">
.invisible {
  position: absolute;
  z-index: -9999;
  margin-right: -9999px;
}

.mute {
  margin-right: -10px;
  margin-left: -13px;
}

.hover {
  cursor: pointer;
}

.wrap-table {
  table {
    border-collapse: separate;
    width: 100%;
    margin-bottom: 22px;
    border-spacing: 0 6px;

    thead {
      .header {
        border: 2px solid var(--light-blue);
        background-color: var(--light-blue);

        th {
          font-size: 14px;
          font-weight: 400;
          height: 44px;
          text-align: left;
          padding-left: 18px;

          .question-mark {
            position: absolute;
            top: 7px;
          }
        }
      }
    }

    tbody {
      tr {
        border: 2px solid var(--cdr-border-row);
        box-shadow: 0 5px 16px rgba(0, 0, 0, 0.15);

        &.row-player {
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
        }

        td {
          font-size: 16px;
          font-weight: 300;
          height: 52px;
          text-align: left;
          padding-left: 18px;
          position: relative;
          color: var(--font-panel);

          .phone {
            margin-right: 5px;
          }

          .up {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            align-items: center;
            margin-left: 5px;
            cursor: pointer;
          }

          .flag {
            margin: 2px 0 -2px;
          }

          .player {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 52px;
            background-color: transparent;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: space-between;
            text-align: center;

            .step {
              //margin-bottom: -8px;
            }

            .step-timer {
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              justify-content: space-between;
              align-items: center;
              margin-left: 18px;
              width: 108px;
            }

            .timer {
              width: 65%;
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              justify-content: space-between;
              align-items: center;

              .timer-width {
                width: calc(100% - 70px);
              }

              span {
                padding: 0 5px;
                font-size: 12px;
                font-weight: 400;
                color: #515960;
              }
            }

            .volume-wrapper {
              display: flex;
              flex-direction: row;
              flex-wrap: nowrap;
              justify-content: space-between;
              align-items: center;
            }

            .range-wrapper {
              position: relative;
              height: 2px;
              min-width: 200px;
              margin: 0 3px;
            }

            input[type="range"] {
              position: absolute;
              top: -11px;
              left: 0;
              width: 100%;
              height: 24px;
              -webkit-appearance: none;
              -moz-appearance: none;
              appearance: none;
              background: transparent;
              border: none;
              outline: none;
            }

            input[type="range"]::-webkit-slider-runnable-track {
              border-radius: 10px/100%;
              height: 2px;
            }

            input[type="range"]::-webkit-slider-thumb {
              background: var(--light-blue);
              border-radius: 50%;
              cursor: pointer;
              width: 10px;
              height: 10px;
              -webkit-appearance: none;
              margin-top: -4px;
            }

            input[type="range"]::-moz-range-track {
              border-radius: 10px/100%;
              height: 2px;
            }

            input[type="range"]::-moz-range-thumb {
              background: var(--light-blue);
              border-radius: 50%;
              cursor: pointer;
              width: 10px;
              height: 10px;
              -webkit-appearance: none;
              margin-top: -4px;
            }
          }

          .cursor {
            cursor: pointer;

            &:hover {
              transform: scale(1.1);
            }

            &:active {
              transform: scale(1);
            }
          }

          .disabled {
            transform: scale(0);

            &:hover {
              transform: scale(1);
            }
          }
        }
      }
    }

    .border-item {
      border-top: 2px solid var(--statement-border);
      border-bottom: 2px solid var(--statement-border);
      position: relative;

      .description {
        margin-top: 3px;
        font-size: 10px;
        color: #ccc;
      }

      &.name {
        max-width: 200px;
      }

      &.left-item {
        border-left: 2px solid var(--statement-border);
      }

      &.right-item {
        border-right: 2px solid var(--statement-border);
      }

      .phone-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        width: 85%;
      }
    }
  }
}
@media (max-width: 1724px) {
  .invisible {
    opacity: 0;
  }
}
</style>
