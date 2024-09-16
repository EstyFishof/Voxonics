<template>
  <section class="content-wrapp">
    <section>
      <div class="container">
        <div class="content">
          <div class="title-container">
            <div class="text ava">
              <div class="avatar"><img :src="userAgentPanel.avatar || defaultAva" alt="user-avatar" /></div>
              <span class="ellipsis name">Hi, {{ userAgentPanel.name }}!</span>
            </div>
          </div>
          <table class="user-table">
            <thead>
              <tr class="table-header">
                <th>Agent Number (ID)</th>
                <th>Calls Today</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text">
                  {{ userAgentPanel.internalNumber }}
                </td>
                <td class="text"></td>
                <td :style="{ color: getColorAndIconAgentPanel.color }" class="status">
                  <span
                    class="days"
                    :style="{ background: getColorAndIconAgentPanel.color }"
                    v-if="getTimeAgentPanel.days"
                    content="Days"
                    v-tippy="{ placement: 'top', arrow: true, delay: 800, duration: 500 }"
                  >
                    <span class="circle">
                      {{ getTimeAgentPanel.days }}
                    </span>
                  </span>
                  <span class="talkingTo">{{ userAgentPanel.talkingTo }}</span>
                  <img
                    width="25"
                    :src="getColorAndIconAgentPanel.icon"
                    alt="phone"
                    class="status-phone"
                  />
                  {{ userAgentPanel.statusText }} {{ getTimeAgentPanel.time }}
                </td>
                <td>
                  <div class="btn-wrapper">
                    <svg
                      :class="{ disabled: !userAgentPanel.onShift }"
                      @click="pause()"
                      class="btn"
                      v-show="!userAgentPanel.onPause"
                      width="90"
                      height="28"
                      viewBox="0 0 90 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="0.5" y="0.5" width="89" height="27" rx="1.5" stroke="#00C82C" />
                      <path
                        d="M41.1787 15.8232H38.1729V21H36.4766V8.20312H40.7129C42.1543 8.20312 43.2617 8.53125 44.0352 9.1875C44.8145 9.84375 45.2041 10.7988 45.2041 12.0527C45.2041 12.8496 44.9873 13.5439 44.5537 14.1357C44.126 14.7275 43.5283 15.1699 42.7607 15.4629L45.7666 20.8945V21H43.9561L41.1787 15.8232ZM38.1729 14.4434H40.7656C41.6035 14.4434 42.2686 14.2266 42.7607 13.793C43.2588 13.3594 43.5078 12.7793 43.5078 12.0527C43.5078 11.2617 43.2705 10.6553 42.7959 10.2334C42.3271 9.81152 41.6475 9.59766 40.7568 9.5918H38.1729V14.4434ZM51.2686 21.1758C49.9795 21.1758 48.9307 20.7539 48.1221 19.9102C47.3135 19.0605 46.9092 17.9268 46.9092 16.5088V16.21C46.9092 15.2666 47.0879 14.4258 47.4453 13.6875C47.8086 12.9434 48.3125 12.3633 48.957 11.9473C49.6074 11.5254 50.3105 11.3145 51.0664 11.3145C52.3027 11.3145 53.2637 11.7217 53.9492 12.5361C54.6348 13.3506 54.9775 14.5166 54.9775 16.0342V16.7109H48.5352C48.5586 17.6484 48.8311 18.4072 49.3525 18.9873C49.8799 19.5615 50.5479 19.8486 51.3564 19.8486C51.9307 19.8486 52.417 19.7314 52.8154 19.4971C53.2139 19.2627 53.5625 18.9521 53.8613 18.5654L54.8545 19.3389C54.0576 20.5635 52.8623 21.1758 51.2686 21.1758ZM51.0664 12.6504C50.4102 12.6504 49.8594 12.8906 49.4141 13.3711C48.9688 13.8457 48.6934 14.5137 48.5879 15.375H53.3516V15.252C53.3047 14.4258 53.082 13.7871 52.6836 13.3359C52.2852 12.8789 51.7461 12.6504 51.0664 12.6504ZM62.7383 21C62.6445 20.8125 62.5684 20.4785 62.5098 19.998C61.7539 20.7832 60.8516 21.1758 59.8027 21.1758C58.8652 21.1758 58.0947 20.9121 57.4912 20.3848C56.8936 19.8516 56.5947 19.1777 56.5947 18.3633C56.5947 17.373 56.9697 16.6055 57.7197 16.0605C58.4756 15.5098 59.5361 15.2344 60.9014 15.2344H62.4834V14.4873C62.4834 13.9189 62.3135 13.4678 61.9736 13.1338C61.6338 12.7939 61.1328 12.624 60.4707 12.624C59.8906 12.624 59.4043 12.7705 59.0117 13.0635C58.6191 13.3564 58.4229 13.7109 58.4229 14.127H56.7881C56.7881 13.6523 56.9551 13.1953 57.2891 12.7559C57.6289 12.3105 58.0859 11.959 58.6602 11.7012C59.2402 11.4434 59.876 11.3145 60.5674 11.3145C61.6631 11.3145 62.5215 11.5898 63.1426 12.1406C63.7637 12.6855 64.0859 13.4385 64.1094 14.3994V18.7764C64.1094 19.6494 64.2207 20.3438 64.4434 20.8594V21H62.7383ZM60.04 19.7607C60.5498 19.7607 61.0332 19.6289 61.4902 19.3652C61.9473 19.1016 62.2783 18.7588 62.4834 18.3369V16.3857H61.209C59.2168 16.3857 58.2207 16.9688 58.2207 18.1348C58.2207 18.6445 58.3906 19.043 58.7305 19.3301C59.0703 19.6172 59.5068 19.7607 60.04 19.7607ZM66.2627 16.166C66.2627 14.707 66.6084 13.5352 67.2998 12.6504C67.9912 11.7598 68.8965 11.3145 70.0156 11.3145C71.1289 11.3145 72.0107 11.6953 72.6611 12.457V7.5H74.2871V21H72.793L72.7139 19.9805C72.0635 20.7773 71.1582 21.1758 69.998 21.1758C68.8965 21.1758 67.9971 20.7246 67.2998 19.8223C66.6084 18.9199 66.2627 17.7422 66.2627 16.2891V16.166ZM67.8887 16.3506C67.8887 17.4287 68.1113 18.2725 68.5566 18.8818C69.002 19.4912 69.6172 19.7959 70.4023 19.7959C71.4336 19.7959 72.1865 19.333 72.6611 18.4072V14.0391C72.1748 13.1426 71.4277 12.6943 70.4199 12.6943C69.623 12.6943 69.002 13.002 68.5566 13.6172C68.1113 14.2324 67.8887 15.1436 67.8887 16.3506ZM79.9297 18.6182L82.1445 11.4902H83.8848L80.0615 22.4678C79.4697 24.0498 78.5293 24.8408 77.2402 24.8408L76.9326 24.8145L76.3262 24.7002V23.3818L76.7656 23.417C77.3164 23.417 77.7441 23.3057 78.0488 23.083C78.3594 22.8604 78.6143 22.4531 78.8135 21.8613L79.1738 20.8945L75.7812 11.4902H77.5566L79.9297 18.6182Z"
                        fill="#00C82C"
                      />
                      <circle cx="16" cy="14" r="10.5" stroke="#00C82C" />
                      <path
                        d="M11 13.4758L15.037 17L23 10"
                        class="accept"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <circle class="subs" cx="26.5" cy="19.5" r="6" stroke="#FFB200" />
                      <rect class="vertical-pause" x="24" y="16" width="2.14286" height="7" rx="1.07143" />
                      <rect class="vertical-pause" x="27" y="16" width="2.14286" height="7" rx="1.07143" />
                    </svg>
                    <svg
                      :class="{ disabled: !userAgentPanel.onShift }"
                      @click="pause()"
                      class="btn"
                      v-show="userAgentPanel.onPause"
                      width="90"
                      height="28"
                      viewBox="0 0 90 28"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="0.5" y="0.5" width="89" height="27" rx="1.5" class="subs" stroke="#FFB200" />
                      <path
                        d="M38.1729 15.9902V21H36.4854V8.20312H41.2051C42.6055 8.20312 43.7012 8.56055 44.4922 9.27539C45.2891 9.99023 45.6875 10.9365 45.6875 12.1143C45.6875 13.3564 45.2979 14.3145 44.5186 14.9883C43.7451 15.6562 42.6348 15.9902 41.1875 15.9902H38.1729ZM38.1729 14.6104H41.2051C42.1074 14.6104 42.7988 14.3994 43.2793 13.9775C43.7598 13.5498 44 12.9346 44 12.1318C44 11.3701 43.7598 10.7607 43.2793 10.3037C42.7988 9.84668 42.1396 9.60938 41.3018 9.5918H38.1729V14.6104ZM53.3516 21C53.2578 20.8125 53.1816 20.4785 53.123 19.998C52.3672 20.7832 51.4648 21.1758 50.416 21.1758C49.4785 21.1758 48.708 20.9121 48.1045 20.3848C47.5068 19.8516 47.208 19.1777 47.208 18.3633C47.208 17.373 47.583 16.6055 48.333 16.0605C49.0889 15.5098 50.1494 15.2344 51.5146 15.2344H53.0967V14.4873C53.0967 13.9189 52.9268 13.4678 52.5869 13.1338C52.2471 12.7939 51.7461 12.624 51.084 12.624C50.5039 12.624 50.0176 12.7705 49.625 13.0635C49.2324 13.3564 49.0361 13.7109 49.0361 14.127H47.4014C47.4014 13.6523 47.5684 13.1953 47.9023 12.7559C48.2422 12.3105 48.6992 11.959 49.2734 11.7012C49.8535 11.4434 50.4893 11.3145 51.1807 11.3145C52.2764 11.3145 53.1348 11.5898 53.7559 12.1406C54.377 12.6855 54.6992 13.4385 54.7227 14.3994V18.7764C54.7227 19.6494 54.834 20.3438 55.0566 20.8594V21H53.3516ZM50.6533 19.7607C51.1631 19.7607 51.6465 19.6289 52.1035 19.3652C52.5605 19.1016 52.8916 18.7588 53.0967 18.3369V16.3857H51.8223C49.8301 16.3857 48.834 16.9688 48.834 18.1348C48.834 18.6445 49.0039 19.043 49.3438 19.3301C49.6836 19.6172 50.1201 19.7607 50.6533 19.7607ZM63.1426 20.0596C62.5098 20.8037 61.5811 21.1758 60.3564 21.1758C59.3428 21.1758 58.5693 20.8828 58.0361 20.2969C57.5088 19.7051 57.2422 18.832 57.2363 17.6777V11.4902H58.8623V17.6338C58.8623 19.0752 59.4482 19.7959 60.6201 19.7959C61.8623 19.7959 62.6885 19.333 63.0986 18.4072V11.4902H64.7246V21H63.1777L63.1426 20.0596ZM72.7402 18.4775C72.7402 18.0381 72.5732 17.6982 72.2393 17.458C71.9111 17.2119 71.334 17.001 70.5078 16.8252C69.6875 16.6494 69.0342 16.4385 68.5479 16.1924C68.0674 15.9463 67.71 15.6533 67.4756 15.3135C67.2471 14.9736 67.1328 14.5693 67.1328 14.1006C67.1328 13.3213 67.4609 12.6621 68.1172 12.123C68.7793 11.584 69.623 11.3145 70.6484 11.3145C71.7266 11.3145 72.5996 11.5928 73.2676 12.1494C73.9414 12.7061 74.2783 13.418 74.2783 14.2852H72.6436C72.6436 13.8398 72.4531 13.4561 72.0723 13.1338C71.6973 12.8115 71.2227 12.6504 70.6484 12.6504C70.0566 12.6504 69.5938 12.7793 69.2598 13.0371C68.9258 13.2949 68.7588 13.6318 68.7588 14.0479C68.7588 14.4404 68.9141 14.7363 69.2246 14.9355C69.5352 15.1348 70.0947 15.3252 70.9033 15.5068C71.7178 15.6885 72.377 15.9053 72.8809 16.1572C73.3848 16.4092 73.7568 16.7139 73.9971 17.0713C74.2432 17.4229 74.3662 17.8535 74.3662 18.3633C74.3662 19.2129 74.0264 19.8955 73.3467 20.4111C72.667 20.9209 71.7852 21.1758 70.7012 21.1758C69.9395 21.1758 69.2656 21.041 68.6797 20.7715C68.0938 20.502 67.6338 20.127 67.2998 19.6465C66.9717 19.1602 66.8076 18.6357 66.8076 18.0732H68.4336C68.4629 18.6182 68.6797 19.0518 69.084 19.374C69.4941 19.6904 70.0332 19.8486 70.7012 19.8486C71.3164 19.8486 71.8086 19.7256 72.1777 19.4795C72.5527 19.2275 72.7402 18.8936 72.7402 18.4775ZM80.4307 21.1758C79.1416 21.1758 78.0928 20.7539 77.2842 19.9102C76.4756 19.0605 76.0713 17.9268 76.0713 16.5088V16.21C76.0713 15.2666 76.25 14.4258 76.6074 13.6875C76.9707 12.9434 77.4746 12.3633 78.1191 11.9473C78.7695 11.5254 79.4727 11.3145 80.2285 11.3145C81.4648 11.3145 82.4258 11.7217 83.1113 12.5361C83.7969 13.3506 84.1396 14.5166 84.1396 16.0342V16.7109H77.6973C77.7207 17.6484 77.9932 18.4072 78.5146 18.9873C79.042 19.5615 79.71 19.8486 80.5186 19.8486C81.0928 19.8486 81.5791 19.7314 81.9775 19.4971C82.376 19.2627 82.7246 18.9521 83.0234 18.5654L84.0166 19.3389C83.2197 20.5635 82.0244 21.1758 80.4307 21.1758ZM80.2285 12.6504C79.5723 12.6504 79.0215 12.8906 78.5762 13.3711C78.1309 13.8457 77.8555 14.5137 77.75 15.375H82.5137V15.252C82.4668 14.4258 82.2441 13.7871 81.8457 13.3359C81.4473 12.8789 80.9082 12.6504 80.2285 12.6504Z"
                        fill="#FFB200"
                      />
                      <circle cx="16" cy="14" r="10.5" stroke="#FFB200" />
                      <circle cx="26.5" cy="19.5" r="6" class="subs" stroke="#00C82C" />
                      <path
                        d="M24 19.9862L26.0185 22L30 18"
                        class="accept"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <rect x="12" y="9" width="3.06122" height="10" rx="1.53061" class="vertical-pause" />
                      <rect x="17" y="9" width="3.06122" height="10" rx="1.53061" class="vertical-pause" />
                    </svg>
                    <span @click="logout()" class="item-menu-btn menu-log-out">
                      <img src="@/assets/img/icons/menu-logout-agentsMap.svg" class="log-out-icon" />
                      Log out
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="sh">
          <div class="main-container">
          <!-- הצגת ה pop up לסיכום שיחה -->
    <button @click="showPopup = true" class="open-popup-button">
      Open Popup
    </button>

    <div v-if="showPopup" class="popup-overlay">
      <div class="popup-content">
        <div class="popup-header">
          <div>To continue, please leave a comment and status about the call</div>
        </div>
        <div class="popup-body">
          <div class="info-row">
            <div class="info-pair">
              <div class="label">ID:</div>
              <div class="value">{{ formData.id }}</div>
            </div>
            <div class="info-pair">
              <div class="label">First Name:</div>
              <div class="value">{{ formData.firstName }}</div>
            </div>
            <div class="info-pair">
              <div class="label">Last Name:</div>
              <div class="value">{{ formData.lastName }}</div>
            </div>
            <div class="info-pair">
              <div class="label">Phone Number:</div>
              <div class="value">{{ formData.phoneNumber }}</div>
            </div>
          </div>


          <div class="input-row">
            <div class="contact-status">Select Contact Status</div>
            <div class="checkbox-row">
              <label>
                <input type="radio" value="sale made" v-model="formData.status" />
                Sale Made
              </label>
              <label>
                <input type="radio" value="not interested" v-model="formData.status" />
                Not Interested
              </label>
              <label>
                <input type="radio" value="follow up" v-model="formData.status" />
                Follow Up
              </label>
              <label>
                <input type="radio" value="dnc" v-model="formData.status" />
                DNC
              </label>
              <label>
                <input type="radio" value="interested" v-model="formData.status" />
                Interested
              </label>
            </div>
          </div>
          <div v-if="formData.status === 'interested'" class="input-row">
            <div class="select-row">
              <div>
                <!-- <label>Assign to: </label> -->
                <select v-model="formData.assignTo" class="select-box">
                  <option value="" disabled selected>Assign to</option>
                  <option value="">Avi</option>
                  <option value="">Dani</option>
                  <option value="">Eli</option>
                </select>
              </div>
              <div>
                <!-- <label>Department: </label> -->
                <select v-model="formData.department" class="select-box">
                  <option value="" disabled selected>Department</option>
                  <option value="">sales</option>
                  <option value="">products</option>
                </select>
              </div>
              <div>
                <!-- <label>Campaign Name: </label> -->
                <select v-model="formData.campaignName" class="select-box">
                  <option value="" disabled selected>Campaign Name</option>
                  <option value="">a</option>
                  <option value="">b</option>
                  <option value="">c</option>
                </select>
              </div>
            </div>
          </div>
          <div class="input-row">
  <label id="call-back-label">
    <input 
      id="call-back-radio" 
      type="radio" 
      v-model="formData.callback" 
      :value="true" 
    />
    Call back in
  </label>
  
  <div class="select-row">
    <!-- Select box for number, disabled when the radio button is not selected -->
    <select 
      v-model="formData.callbackNumber" 
      class="select-box" 
      :disabled="!formData.callback"
    >
      <option value="" disabled selected>number</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>

    <!-- Select box for timeframe, disabled when the radio button is not selected -->
    <select 
      v-model="formData.callbackTimeframe" 
      class="select-box" 
      :disabled="!formData.callback"
    >
      <option value="" disabled selected>time</option>
      <option value="day">Day</option>
      <option value="week">Week</option>
      <option value="month">Month</option>
    </select>
  </div>
</div>

          <div class="input-row">
            <label class="comment-label">Leave your comment: </label>
            <textarea id="text-area" v-model="formData.comment"></textarea>
          </div>
        </div>
        <div class="popup-footer">
          <button @click="saveData">Continue</button>
        </div>
      </div>
    </div>

    <div class="agent-panel">
      <div class="title">Agent Panel</div>
      <div class="filter">
  <div class="filter-label">Filter by:</div>
  <div class="filter-row">
    <input v-model="filters.firstName" placeholder="First Name" />
    <input v-model="filters.lastName" placeholder="Last Name" />
    <input v-model="filters.status" placeholder="Status" />
    <input v-model="filters.comment" placeholder="Comment" />
  </div>
</div>

      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Contact Status</th>
            <th>Comment</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry) in filteredData" :key="entry.id">
            <td>{{ entry.id }}</td>
            <td>{{ entry.firstName }}</td>
            <td>{{ entry.lastName }}</td>
            <td>{{ entry.phoneNumber }}</td>
            <td>{{ entry.status }}</td>
            <td>
              <input class="comment-input" v-model="entry.comment" @input="updateComment(entry)" />

            </td>
            <td>
              <img src="../assets/img/delete.png" alt="Delete" class="delete-icon" @click="deleteRowFunc(entry.id)" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import ava from "@/assets/img/icons/user_icon.svg"
import OnlineIcon from "@/assets/img/icons/OnlineIcon.svg"
import PauseIcon from "@/assets/img/icons/PauseIcon.svg"
import OfflineIcon from "@/assets/img/icons/OfflineIcon.svg"
import TalkingIcon from "@/assets/img/icons/TalkingIcon.svg"
import UnreachableIcon from "@/assets/img/icons/UnreachableIcon.svg"
import CallingIcon from "@/assets/img/icons/CallingIcon.svg"
import Phone from '@/views/Phone/Phone'
import { mapGetters } from "vuex"

export default {
  components: {
    Phone
  },
  data() {
    return {
      unsubscribe: () => {},
      interval: null,
      time: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      defaultAva: ava,
      OnlineIcon: OnlineIcon,
      PauseIcon: PauseIcon,
      OfflineIcon: OfflineIcon,
      TalkingIcon: TalkingIcon,
      UnreachableIcon: UnreachableIcon,
      CallingIcon: CallingIcon,
      showPopup: false,
      filters: {
        firstName: "",
        lastName: "",
        status: "",
        comment: "",
      },
      formData: {
        id: Math.floor(Math.random() * 1000000),
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "123-456-7890",
        status: "",
        assignTo: "",
        department: "",
        campaignName: "",
        callback: false,
        callbackNumber: "",
        callbackTimeframe: "",
        comment: "",
      },
      tableData: [],
    }
  },
  computed: {
    ...mapGetters(['userAgentPanel', 'phoneWindowMode', 'getTimeAgentPanel', 'getColorAndIconAgentPanel']),
    filteredData() {
      if (!Array.isArray(this.tableData)) {
        return [];
      }
      return this.tableData.filter((entry) => {
        return (
          (entry.firstName || "").toLowerCase().includes(this.filters.firstName.toLowerCase()) &&
          (entry.lastName || "").toLowerCase().includes(this.filters.lastName.toLowerCase()) &&
          (entry.status || "").toLowerCase().includes(this.filters.status.toLowerCase()) &&
          (entry.comment || "").toLowerCase().includes(this.filters.comment.toLowerCase())
        );
      });
    },
    // elapsed: function() {
    //   const days = this.days < 10 ? `0${this.days}` : this.days
    //   const minutes = this.minutes < 10 ? `0${this.minutes}` : this.minutes
    //   const seconds = this.seconds < 0 ? "00" : this.seconds < 10 ? `0${this.seconds}` : this.seconds
    //   return { days: days, time: `${minutes}:${seconds}` }
    // }
  },
  methods: {
    pause() {
      this.$store.dispatch("switchPause")
    },
    logout() {
      this.$store.dispatch("pushLogout")
    },
    // computedTime() {
    //   const time =
    //     this.userAgentPanel.status === "onpause"
    //       ? this.userAgentPanel.statusTime
    //       : this.userAgentPanel.statusPhone.time
    //   let seconds = Math.round((Date.now() - +sessionStorage.getItem("offsetTime") - +time) / 1000)
    //   if (seconds >= 60) {
    //     this.minutes = Math.floor(JSON.parse(JSON.stringify(seconds)) / 60)
    //     this.seconds = JSON.parse(JSON.stringify(seconds)) % 60
    //     if (this.minutes >= 1440) {
    //       this.days = Math.floor(JSON.parse(JSON.stringify(this.minutes)) / 1440)
    //       this.minutes = JSON.parse(JSON.stringify(this.minutes)) % 1440
    //     }
    //   } else {
    //     this.minutes = "0"
    //     this.seconds = seconds
    //   }
    // },
    // setTime() {
    //   if (this.interval) {
    //     clearInterval(this.interval)
    //   }
    //   this.interval = setInterval(this.computedTime, 1000)
    // },
    // changeColor(status) {
    //   switch (status) {
    //     case "online":
    //       return { color: "#00C82C", icon: this.OnlineIcon }
    //     case "paused":
    //       return { color: "#FFB200", icon: this.PauseIcon }
    //     case "offline":
    //       return { color: "#FF3A29", icon: this.OfflineIcon }
    //     case "calling":
    //       return { color: "#78ABCE", icon: this.CallingIcon }
    //     case "ringing":
    //       return { color: "#78ABCE", icon: this.CallingIcon }
    //     case "talking":
    //       return { color: "#276899", icon: this.TalkingIcon }
    //     case "blocked":
    //       return { color: "#636D75", icon: this.UnreachableIcon }
    //     default:
    //       if (status?.indexOf("&") !== -1) {
    //         return { color: "#78ABCE", icon: this.CallingIcon }
    //       } else return { color: "#636D75", icon: this.UnreachableIcon }
    //   }
    // }
  
  
  
  
  
  
  
    updateComment(row) {
      this.updateCommentOnServer(row);
    },
    deleteRowFunc(id) {
      console.log('func delete')
      this.deleteRow(id)
    },

    async updateCommentOnServer(row) {
      try {
        const response = await fetch('http://localhost:3000/update-comment', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(row),
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        console.log('Comment updated successfully');
      } catch (error) {
        console.error('Error updating comment:', error);
      }
    },


    async fetchData() {
      try {
        const response = await fetch('http://localhost:3000/load-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.tableData = data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },


    saveData() {
      this.tableData.push({ ...this.formData });
      this.saveToFile();
      this.resetForm();
      this.showPopup = false;
    },
    saveToFile() {
      const data = {
        id: this.formData.id,
        firstName: this.formData.firstName,
        lastName: this.formData.lastName,
        phoneNumber: this.formData.phoneNumber,
        status: this.formData.status,
        comment: this.formData.comment,
      };

      fetch('http://localhost:3000/save-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => {
          if (response.ok) {
            console.log('Data saved successfully');
          } else {
            console.error('Error saving data');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    },

    resetForm() {
      this.formData = {
        id: Math.floor(Math.random() * 1000000),
        firstName: "John",
        lastName: "Doe",
        phoneNumber: "123-456-7890",
        status: "",
        assignTo: "",
        department: "",
        campaignName: "",
        callback: false,
        callbackNumber: "",
        callbackTimeframe: "",
        comment: "",
      };
    },
    async deleteRow(id) {
      try {
        // מחיקת השורה מהשרת והקובץ
        await fetch(`http://localhost:3000/delete-row/${id}`, {
          method: 'DELETE',
        });

        // עדכון מערך השורות המקומי
        this.tableData = this.tableData.filter(row => row.id !== id);
        console.log(this.tableData)
      } catch (error) {
        console.error('Error deleting row:', error);
      }
    },
  
  
  
  
  
  
  
  
  },
  mounted() {
    // this.unsubscribe = this.$store.subscribeAction(action => {
    //   if (action.type === "onEvent") {
    //     this.setTime()
    //   }
    // })

    // this.$store.dispatch("startConnection")
    console.log("mounted")
    // פונקציה לטעינת הנתונים מהשרת לאחר שהרכיב נטען
    this.fetchData();
  },
  beforeDestroy() {
    // this.$store.dispatch("closeConnection")
    // this.unsubscribe()
  }
}
</script>

<style scoped lang="scss">
.content-wrapp {
  width: 100%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.12);
  border-radius: 4px 4px 0 0;
  color: var(--font-panel);
}

.container {
  height: 100%;
  padding: 0;
  border: 2px solid var(--main-border);
  border-radius: 0 0 8px 8px;
  background-color: var(--substrate);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);

  .content {
    padding: 24px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.avatar {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.name {
  width: 200px;
  text-align: left;
}

.text {
  font-size: 24px;
  font-weight: 400;
  margin-right: 40px;
  text-align: center;
}

.ava {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 15px;
}

.status {
  font-size: 24px;
  font-weight: 400;
  color: #00c82c;
  text-transform: capitalize;
  position: relative;

  .days {
    position: absolute;
    top: 10px;
    left: -12px;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: auto;
    cursor: auto;

    .circle {
      width: 21px;
      height: 21px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--users-table-bg);
      color: var(--font-panel);
      font-weight: 300;
      font-size: 9px;
      line-height: 11px;
    }
  }

  .talkingTo {
    position: absolute;
    font-size: 20px;
    top: 37px;
  }
}

.user-table {
  text-align: center;
  margin-top: -9px;

  thead {
    th {
      font-size: 14px;
      font-weight: 300;
      color: #515960;
      padding: 0 24px;
      text-align: left;
    }
  }

  tbody {
    td {
      padding: 8px 24px;

      &:not(.text) {
        text-align: left;
      }

      .btn-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        gap: 10px;

        .item-menu-btn {
          height: 28px;
          padding: 3px 5px;
          box-sizing: border-box;
          border-radius: 2px;
          font-weight: normal;
          font-size: 14px;
          line-height: 16px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }

        .menu-log-out {
          cursor: pointer;
          height: 28px;
          border: 1px solid #ff3a29;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
          color: #ff3a29;
          text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
          max-width: 30px;
          overflow: hidden;
          transition: all 0.3s;
          white-space: nowrap;

          img {
            margin-left: -1px;
          }

          .log-out-icon {
            transition: all 0.3s;
            transform: rotate(-90deg) translate(3px, -6px);
          }

          &:hover {
            max-width: 90px;
            transition: all 0.3s;

            .log-out-icon {
              transition: all 0.3s;
              transform: rotate(0deg) translate(2px, -3px);
            }
          }
        }

        .btn {
          cursor: pointer;
          transition: 0.3s;

          &:hover {
            transform: scale(1.01);
          }

          &:active {
            transform: scale(1);
          }
        }

        .btn.disabled {
          pointer-events: none;
          filter: grayscale(0.7);
        }
      }
    }
  }
}

.phone-logo {
  position: relative;

  .phone-logo-image {
    position: absolute;
    left: -4px;
    top: -3px;
    z-index: 10;
  }
}

// <<<<<<<<<<<<<<<< SVG COLOR >>>>>>>>>>>>>>>>>>
.subs {
  fill: var(--substrate);
}

.vertical-pause {
  fill: var(--font-panel);
}

.accept {
  stroke: var(--font-panel);
}

.bg-pause {
  fill: var(--switch-bg);
}

@media (max-width: 1920px) {
  .content-wrapp {
    width: 1479.41px;
  }
}

@media (max-width: 1780px) {
  .content-wrapp {
    width: 1330px;
  }
  .container {
    .content {
      padding: 24px 18px;
    }
  }
}

@media (max-width: 1600px) {
  .content-wrapp {
    width: 1230px;
  }
}

@media (max-width: 1504px) {
  .content-wrapp {
    width: 1136px;
  }
}

@media (max-width: 1408px) {
  .content-wrapp {
    width: 1006px;
  }
  .container {
    .content {
      padding: 24px 18px;
    }
  }
  .text {
    margin-right: 0;
  }
}

// @media (max-width: 1280px) {
//   .content-wrapp {
//     width: 1006px;
//   }
//   .container {
//     .content {
//       padding: 24px 18px;
//     }
//   }
//   .text {
//     margin-right: 0;
//   }
// }












.main-container{
  z-index: 1;
}
.open-popup-button {
  background:rgb(15,29,40);
  color: #fff;
  border:rgb(32,41,51) solid 1px;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  margin-bottom: 20px;
  transition: background-color 0.3s;
}

.open-popup-button:hover {
  background:rgb(32,41,51);
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(8, 7, 7, 0.7);
  display: flex;
  justify-content: center;  
  align-items: center;
  z-index: 1000; /* Ensure the overlay is on top of the content */
}

.popup-content {
  border:rgb(43, 48, 51) 0.5px solid;
  background: rgb(15, 29, 40);
  color: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 25%;
  max-width: 90%;
  font-weight: 300;
  z-index: 1001; /* Ensure the popup is on top of the overlay */
  /* margin-left: 15%; */
}

.popup-header {
  margin: 10px;
  padding: 0;
  font-weight: 400;
  font-size: 20px;
  margin-bottom: 10px;
}

.info-row {
  display: flex;
  justify-content: space-between;
}

.info-pair {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* ממרכז את התווית והערך */
  margin-bottom: 10px;
  /* רווח בין כל זוג תווית-ערך */
}

.label {
  font-size: 12px;
  /* גודל כתב קטן */
  font-weight: 10;
  color:#797979
  /* כתב דק */
}
.comment-label{
  font-size: 12px;
  /* גודל כתב קטן */
  font-weight: 10;
  color:#797979,
  
}

.value {
  font-size: 14px;
  /* גודל כתב עבור הערכים, ניתן לשנות לפי הצורך */
}

/* .labels div {
  font-size: 12px;
  font-weight: 300;
} */

.input-row {
  margin-bottom: 15px;
}

.contact-status {
  margin: 10px;
  font-size: 14px;
  font-weight: 300;
}

.checkbox-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: 300;
  color:#797979;

}

.select-row {
  justify-content: center;
  display: flex;
  // justify-content: space-between;
  gap: 10px;
}

.select-box {
  background: rgb(35, 44, 54);
  color: #fff;
  padding: 5px;
  margin-top: 5px;
  border: none;
}

.input-row label {
  display: block;
}

.input-row textarea {
  width: 40%;
  padding: 5px;
  margin-top: 5px;
  height: 25px;
  background: rgb(35, 44, 54);
  color: #fff;
  border-radius: 3px;
  border: none;
}

.popup-footer {
  text-align: center;
}

.popup-footer button {
  background: #ffffff;
  color: rgb(15, 29, 40);
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.popup-footer button:hover {
  background: rgb(35, 44, 54);
  color: #fff;
}
.agent-panel{
  width: 50%;
  margin-left: 40%;
  background-color: rgb(14,25,34);
  padding:10px ;
}
.title{
  color: #ffffff;
  text-align: left;
  padding-top:10px ;
  padding-bottom:10px ;
  padding-left: 8px;
}
.filter {

  color:#fff;
  display: flex; /* Make the container a flex container */
  align-items: center; /* Center align items vertically */
  gap: 20px; /* Space between the two divs */
  background-color: rgb(32,41,51);

}

.filter-label{
  padding: 7px;
  font-size: 12px;
}
.filter-row {
  
  display: flex; /* Make the inputs align in a row */
  gap: 10px; /* Space between input fields */
}

/* Optional: styling for inputs */
.filter-row input {
  color: #ffffff;
  padding: 1px;
  font-size: 12px;
  border: 1px solid rgb(43,52,61);
  border-radius: 4px;
  background-color: rgb(43,52,61);
  max-width:100px ;
}


/* .filter-row {
  display: flex;
  margin-bottom: 20px;
}

.filter-row input {
  padding: 10px;
  border-radius: 4px;
  border: solid  rgb(35,44,54);
  background: rgb(35,44,54);
  color: #fff;
} */

.data-table {
  width: 100%;
  border-collapse: collapse;
  background: rgb(15,29,40);
  color: #fff;
}

.data-table th,
.data-table td {
  padding: 10px;
  text-align: left;
  /* border: 1px solid #444; */
}
.data-table td {
  font-weight: 30;
  font-size: 13px;
  border-bottom: 0.08px solid #4f4f4f; /* גבול תחתון בין השורות */


}
.data-table th {
  font-size: 12px;
  /* גודל כתב קטן */
  font-weight: 10;
  color:#797979;

  background:rgb(15,29,40);
}
.comment-input{
  background-color: rgb(43,52,61);
  border: none;
  border-radius: 2px;
  color: #fff;
  padding: 5px;
  font-weight: 30;
  font-size: 13px;


}

.delete-icon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.delete-icon:hover {
  opacity: 0.7;
}
.sh{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-weight: 300;
}
#call-back-label{
  font-size: 12px;
  font-weight: 300;
  color:#797979;
}
#text-area{
  height:25px;
}
</style>